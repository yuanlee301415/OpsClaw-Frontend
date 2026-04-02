import { buildDeviceAuthPayload } from './gateway/device-auth.js'
import { GATEWAY_CLIENT_MODES, GATEWAY_CLIENT_NAMES } from './gateway/protocol/client-info.js'
import { ConnectErrorDetailCodes, readConnectErrorRecoveryAdvice, readConnectErrorDetailCode } from './gateway/protocol/connect-error-details.js'
import { clearDeviceAuthToken, loadDeviceAuthToken, storeDeviceAuthToken } from './device-auth.js'
import { loadOrCreateDeviceIdentity, signDevicePayload } from './device-identity.js'
import { generateUUID } from '@/utils/uuid.js'

/**
 * Gateway请求错误类
 * 继承自Error，用于表示Gateway请求失败
 */
export class GatewayRequestError extends Error {
  gatewayCode // Gateway错误代码
  details // 错误详情

  constructor(error) {
    super(error.message)
    this.name = 'GatewayRequestError'
    this.gatewayCode = error.code
    this.details = error.details
  }
}

/**
 * 从错误对象中提取Gateway错误详情代码
 * @param error - 可能包含details字段的对象
 * @returns 错误详情代码，如果不存在则返回null
 */
export function resolveGatewayErrorDetailCode(error) {
  return readConnectErrorDetailCode(error?.details)
}

/**
 * 判断是否为不可恢复的认证错误
 * 这些错误需要用户干预才能解决，不应自动重连
 *
 * 注意：AUTH_TOKEN_MISMATCH故意不包含在内，因为浏览器客户端支持
 * 在可信端点使用缓存的设备令牌进行一次有界的重试。
 * 令牌不匹配的重连抑制在客户端状态中处理（重试预算用完后）。
 *
 * @param error - Gateway错误信息对象
 * @returns 如果是不可恢复的认证错误返回true，否则返回false
 */
export function isNonRecoverableAuthError(error) {
  if (!error) {
    return false
  }
  const code = resolveGatewayErrorDetailCode(error)
  return (
    code === ConnectErrorDetailCodes.AUTH_TOKEN_MISSING ||
    code === ConnectErrorDetailCodes.AUTH_BOOTSTRAP_TOKEN_INVALID ||
    code === ConnectErrorDetailCodes.AUTH_PASSWORD_MISSING ||
    code === ConnectErrorDetailCodes.AUTH_PASSWORD_MISMATCH ||
    code === ConnectErrorDetailCodes.AUTH_RATE_LIMITED ||
    code === ConnectErrorDetailCodes.PAIRING_REQUIRED ||
    code === ConnectErrorDetailCodes.CONTROL_UI_DEVICE_IDENTITY_REQUIRED ||
    code === ConnectErrorDetailCodes.DEVICE_IDENTITY_REQUIRED
  )
}

/**
 * 判断URL是否为可信的重试端点
 * 可信端点包括：localhost、回环地址、同源地址
 *
 * @param url - 要检查的Gateway URL
 * @returns 如果是可信端点返回true，否则返回false
 */
function isTrustedRetryEndpoint(url) {
  try {
    const gatewayUrl = new URL(url, window.location.href)
    const host = gatewayUrl.hostname.trim().toLowerCase()

    // 检查是否为回环地址
    const isLoopbackHost = host === 'localhost' || host === '::1' || host === '[::1]' || host === '127.0.0.1'
    const isLoopbackIPv4 = host.startsWith('127.')

    if (isLoopbackHost || isLoopbackIPv4) {
      return true
    }

    // 检查是否与当前页面同源
    const pageUrl = new URL(window.location.href)
    return gatewayUrl.host === pageUrl.host
  } catch {
    return false
  }
}

export const CONTROL_UI_OPERATOR_ROLE = 'operator'
/**
 * Control UI操作员所需的权限范围
 * 定义了操作员可以执行的操作类型
 */
export const CONTROL_UI_OPERATOR_SCOPES = [
  'operator.admin', // 管理员权限
  'operator.read', // 读取权限
  'operator.write', // 写入权限
  'operator.approvals', // 批准权限
  'operator.pairing', // 设备配对权限
]

// 4008 = 应用程序自定义代码（浏览器拒绝1008"策略违规"）
const CONNECT_FAILED_CLOSE_CODE = 4008

/**
 * 根据选定的认证信息构建Gateway连接认证参数
 * @param selectedAuth - 选定的认证信息
 * @returns Gateway连接认证参数，如果没有认证信息则返回undefined
 */
function buildGatewayConnectAuth(selectedAuth) {
  const authToken = selectedAuth.authToken

  // 如果没有令牌也没有密码，返回undefined
  if (!(authToken || selectedAuth.authPassword)) {
    return undefined
  }

  return {
    token: authToken,
    deviceToken: selectedAuth.authDeviceToken ?? selectedAuth.resolvedDeviceToken,
    password: selectedAuth.authPassword,
  }
}

/**
 * 构建Gateway设备认证信息
 * 使用Ed25519签名对连接参数进行签名
 *
 * @param params - 构建设备认证所需的参数
 * @returns 设备认证信息，如果没有设备身份则返回undefined
 */
async function buildGatewayConnectDevice(params) {
  const { deviceIdentity } = params

  // 如果没有设备身份，返回undefined
  if (!deviceIdentity) {
    return undefined
  }

  // 获取当前时间戳
  const signedAtMs = Date.now()
  const nonce = params.connectNonce ?? ''

  // 构建设备认证负载
  const payload = buildDeviceAuthPayload({
    deviceId: deviceIdentity.deviceId,
    clientId: params.client.id,
    clientMode: params.client.mode,
    role: params.role,
    scopes: params.scopes,
    signedAtMs,
    token: params.authToken ?? null,
    nonce,
  })

  // 使用私钥对负载进行签名
  const signature = await signDevicePayload(deviceIdentity.privateKey, payload)

  return {
    id: deviceIdentity.deviceId,
    publicKey: deviceIdentity.publicKey,
    signature,
    signedAt: signedAtMs,
    nonce,
  }
}

/**
 * 判断是否应该使用设备令牌进行重试
 * 只有在满足所有条件时才允许重试
 *
 * @param params - 重试决策参数
 * @returns 如果应该使用设备令牌重试返回true，否则返回false
 */
export function shouldRetryWithDeviceToken(params) {
  return (
    !params.deviceTokenRetryBudgetUsed && // 重试预算未用完
    !params.authDeviceToken && // 当前未使用设备令牌
    Boolean(params.explicitGatewayToken) && // 有显式Gateway令牌
    Boolean(params.deviceIdentity) && // 有设备身份
    Boolean(params.storedToken) && // 有存储的设备令牌
    params.canRetryWithDeviceTokenHint && // 服务器建议使用设备令牌
    isTrustedRetryEndpoint(params.url) // 是可信端点
  )
}

export class ChatClient {
  /**
   * @type {WebSocket}
   */
  #ws

  /**
   * @type {Map<string, object>}
   */
  #pending = new Map()

  /**
   * @type {boolean}
   */
  #closed = false

  #lastSeq = null

  /**
   * @type {string}
   */
  #connectNonce = null

  /**
   * @type {boolean}
   */
  #connectSent = false

  /**
   * @type {number}
   */
  #connectTimer = null

  #backoffMs = 800

  #pendingConnectError = void 0

  #pendingDeviceTokenRetry = false

  #deviceTokenRetryBudgetUsed = false

  constructor(opts) {
    this.opts = opts
  }

  start() {
    this.#closed = false
    this.#connect()
    console.log(this.#ws)
  }

  /**
   * 停止Gateway客户端
   * 关闭WebSocket连接并清理所有待处理的请求
   */
  stop() {
    this.#closed = true
    this.#ws?.close()
    this.#ws = null
    this.#pendingConnectError = undefined
    this.#pendingDeviceTokenRetry = false
    this.#deviceTokenRetryBudgetUsed = false
    this.#flushPending(new Error('gateway client stopped'))
  }

  /**
   * 获取连接状态
   * @returns 如果WebSocket处于打开状态返回true
   */
  get connected() {
    return this.#ws?.readyState === WebSocket.OPEN
  }

  #connect() {
    if (this.#closed) return
    this.#ws = new WebSocket(this.opts.url)
    this.#ws.addEventListener('open', () => this.#queueConnect())
    this.#ws.addEventListener('message', (evt) => this.#handleMessage(evt.data ?? ''))
    this.#ws.addEventListener('close', (ev) => {
      const reason = String(ev.reason ?? '')
      const connectError = this.#pendingConnectError
      this.#pendingConnectError = undefined
      this.#ws = null
      this.#flushPending(new Error(`gateway closed (${ev.code}): ${reason}`))
      this.opts.onClose?.({ code: ev.code, reason, error: connectError })
      const connectErrorCode = resolveGatewayErrorDetailCode(connectError)
      if (connectErrorCode === ConnectErrorDetailCodes.AUTH_TOKEN_MISMATCH && this.#deviceTokenRetryBudgetUsed && !this.#pendingDeviceTokenRetry) {
        return
      }
      if (!isNonRecoverableAuthError(connectError)) {
        this.#scheduleReconnect()
      }
    })
    this.#ws.addEventListener('error', (error) => {
      console.error(error)
    })
  }

  /**
   * 重连
   * 使用指数退避策略延迟重连
   */
  #scheduleReconnect() {
    if (this.#closed) {
      return
    }
    const delay = this.#backoffMs
    // 指数退避，最大15秒
    this.#backoffMs = Math.min(this.#backoffMs * 1.7, 15_000)
    window.setTimeout(() => this.#connect(), delay)
  }

  /**
   * 刷新所有待处理的请求
   * 拒绝所有等待中的Promise
   * @param err - 拒绝原因
   */
  #flushPending(err) {
    for (const [, p] of this.#pending) {
      p.reject(err)
    }
    this.#pending.clear()
  }

  /**
   * 构建客户端信息
   * @returns Gateway客户端信息对象
   */
  #buildConnectClient() {
    return {
      id: this.opts.clientName ?? GATEWAY_CLIENT_NAMES.CONTROL_UI,
      version: this.opts.clientVersion ?? 'control-ui',
      platform: this.opts.platform ?? navigator.platform ?? 'web',
      mode: this.opts.mode ?? GATEWAY_CLIENT_MODES.WEBCHAT,
      instanceId: this.opts.instanceId,
    }
  }

  /**
   * 构建连接参数
   * @param plan - 连接计划
   * @returns Gateway连接参数对象
   */
  #buildConnectParams(plan) {
    return {
      minProtocol: 3,
      maxProtocol: 3,
      client: plan.client,
      role: plan.role,
      scopes: plan.scopes,
      device: plan.device,
      caps: ['tool-events'],
      auth: plan.auth,
      userAgent: navigator.userAgent,
      locale: navigator.language,
    }
  }

  /**
   * 构建连接计划
   * 整合所有连接所需的认证信息和设备身份
   * @returns 连接计划对象
   */
  async #buildConnectPlan() {
    const role = CONTROL_UI_OPERATOR_ROLE
    const scopes = [...CONTROL_UI_OPERATOR_SCOPES]
    const client = this.#buildConnectClient()
    const explicitGatewayToken = this.opts.token?.trim() || undefined
    const explicitPassword = this.opts.password?.trim() || undefined

    // crypto.subtle仅在安全上下文（HTTPS、localhost）中可用
    // 在普通HTTP上，我们跳过设备身份并回退到仅令牌认证
    // Gateway可能会拒绝此连接，除非启用了gateway.controlUi.allowInsecureAuth
    const isSecureContext = typeof crypto !== 'undefined' && !!crypto.subtle
    let deviceIdentity
    let selectedAuth = {
      authToken: explicitGatewayToken,
      authPassword: explicitPassword,
      canFallbackToShared: false,
    }

    // 如果是安全上下文，加载或创建设备身份
    if (isSecureContext) {
      deviceIdentity = await loadOrCreateDeviceIdentity()
      selectedAuth = this.#selectConnectAuth({
        role,
        deviceId: deviceIdentity.deviceId,
      })
      // 如果待处理设备令牌重试且已选择设备令牌，清除待处理标志
      if (this.#pendingDeviceTokenRetry && selectedAuth.authDeviceToken) {
        this.#pendingDeviceTokenRetry = false
      }
    }

    return {
      role,
      scopes,
      client,
      explicitGatewayToken,
      selectedAuth,
      auth: buildGatewayConnectAuth(selectedAuth),
      deviceIdentity,
      device: await buildGatewayConnectDevice({
        deviceIdentity,
        client,
        role,
        scopes,
        authToken: selectedAuth.authToken,
        connectNonce: this.#connectNonce,
      }),
    }
  }

  /**
   * 处理连接握手成功
   * 保存设备令牌并触发回调
   * @param hello - Gateway握手成功响应
   * @param plan - 连接计划
   */
  #handleConnectHello(hello, plan) {
    console.log('handleConnectHello:', { hello, plan })
    // 清除重试标志
    this.#pendingDeviceTokenRetry = false
    this.#deviceTokenRetryBudgetUsed = false

    // 如果服务器返回了设备令牌，保存它
    if (hello?.auth?.deviceToken && plan.deviceIdentity) {
      storeDeviceAuthToken({
        deviceId: plan.deviceIdentity.deviceId,
        role: hello.auth.role ?? plan.role,
        token: hello.auth.deviceToken,
        scopes: hello.auth.scopes ?? [],
      })
    }

    // 重置退避时间
    this.#backoffMs = 800

    // 触发握手成功回调
    this.opts.onHello?.(hello)
  }

  /**
   * 处理连接失败
   * 分析错误并决定是否应该使用设备令牌重试
   * @param err - 错误对象
   * @param plan - 连接计划
   */
  #handleConnectFailure(err, plan) {
    // 提取错误代码和恢复建议
    const connectErrorCode = err instanceof GatewayRequestError ? resolveGatewayErrorDetailCode(err) : null
    const recoveryAdvice = err instanceof GatewayRequestError ? readConnectErrorRecoveryAdvice(err.details) : {}
    const retryWithDeviceTokenRecommended = recoveryAdvice.recommendedNextStep === 'retry_with_device_token'
    const canRetryWithDeviceTokenHint =
      recoveryAdvice.canRetryWithDeviceToken === true ||
      retryWithDeviceTokenRecommended ||
      connectErrorCode === ConnectErrorDetailCodes.AUTH_TOKEN_MISMATCH

    // 判断是否应该使用设备令牌重试
    if (
      shouldRetryWithDeviceToken({
        deviceTokenRetryBudgetUsed: this.#deviceTokenRetryBudgetUsed,
        authDeviceToken: plan.selectedAuth.authDeviceToken,
        explicitGatewayToken: plan.explicitGatewayToken,
        deviceIdentity: plan.deviceIdentity,
        storedToken: plan.selectedAuth.storedToken,
        canRetryWithDeviceTokenHint,
        url: this.opts.url,
      })
    ) {
      // 标记待处理设备令牌重试，并使用重试预算
      this.#pendingDeviceTokenRetry = true
      this.#deviceTokenRetryBudgetUsed = true
    }

    // 保存连接错误信息
    if (err instanceof GatewayRequestError) {
      this.#pendingConnectError = {
        code: err.gatewayCode,
        message: err.message,
        details: err.details,
      }
    } else {
      this.#pendingConnectError = undefined
    }

    // 如果设备令牌不匹配且可以回退到共享令牌，清除存储的设备令牌
    if (plan.selectedAuth.canFallbackToShared && plan.deviceIdentity && connectErrorCode === ConnectErrorDetailCodes.AUTH_DEVICE_TOKEN_MISMATCH) {
      clearDeviceAuthToken({ deviceId: plan.deviceIdentity.deviceId, role: plan.role })
    }

    // 关闭WebSocket连接
    this.#ws?.close(CONNECT_FAILED_CLOSE_CODE, 'connect failed')
  }

  /**
   * 发送连接请求
   * 构建连接计划并发送connect请求到Gateway服务器
   */
  async #sendConnect() {
    // 防止重复发送连接请求
    if (this.#connectSent) {
      return
    }
    this.#connectSent = true

    // 清除连接定时器
    if (this.#connectTimer !== null) {
      window.clearTimeout(this.#connectTimer)
      this.#connectTimer = null
    }

    // 构建连接计划
    const plan = await this.#buildConnectPlan()
    console.log('plan:', plan)
    // 发送connect请求并处理响应
    void this.request('connect', this.#buildConnectParams(plan))
      .then((hello) => this.#handleConnectHello(hello, plan))
      .catch((err) => this.#handleConnectFailure(err, plan))
  }

  /**
   * 处理接收到的消息
   * 根据消息类型（事件或响应）进行不同的处理
   * @param raw - 原始消息字符串
   */
  #handleMessage(raw) {
    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch {
      return
    }

    const frame = parsed

    // 处理事件消息
    if (frame.type === 'event') {
      const evt = parsed

      // 处理连接挑战事件
      if (evt.event === 'connect.challenge') {
        const payload = evt.payload
        const nonce = payload && typeof payload.nonce === 'string' ? payload.nonce : null
        if (nonce) {
          this.#connectNonce = nonce
          void this.#sendConnect()
        }
        return
      }

      // 检测消息序列号间隙
      const seq = typeof evt.seq === 'number' ? evt.seq : null
      if (seq !== null) {
        if (this.#lastSeq !== null && seq > this.#lastSeq + 1) {
          this.opts.onGap?.({ expected: this.#lastSeq + 1, received: seq })
        }
        this.#lastSeq = seq
      }

      // 触发事件回调
      try {
        this.opts.onEvent?.(evt)
      } catch (err) {
        console.error('[gateway] event handler error:', err)
      }
      return
    }

    // 处理响应消息
    if (frame.type === 'res') {
      const res = parsed
      const pending = this.#pending.get(res.id)
      if (!pending) {
        return
      }
      this.#pending.delete(res.id)

      // 根据响应结果resolve或reject Promise
      if (res.ok) {
        pending.resolve(res.payload)
      } else {
        pending.reject(
          new GatewayRequestError({
            code: res.error?.code ?? 'UNAVAILABLE',
            message: res.error?.message ?? 'request failed',
            details: res.error?.details,
          }),
        )
      }
    }
  }

  /**
   * 选择连接认证方式
   * 根据可用的认证信息选择最佳的认证方式
   * @param params - 认证选择参数
   * @returns 选定的认证信息
   */
  #selectConnectAuth(params) {
    const explicitGatewayToken = this.opts.token?.trim() || undefined
    const authPassword = this.opts.password?.trim() || undefined

    // 加载存储的设备令牌
    const storedEntry = loadDeviceAuthToken({
      deviceId: params.deviceId,
      role: params.role,
    })
    const storedScopes = storedEntry?.scopes ?? []

    // 检查存储的令牌是否具有读取权限
    const storedTokenCanRead =
      params.role !== CONTROL_UI_OPERATOR_ROLE ||
      storedScopes.includes('operator.read') ||
      storedScopes.includes('operator.write') ||
      storedScopes.includes('operator.admin')
    const storedToken = storedTokenCanRead ? storedEntry?.token : undefined

    // 判断是否应该使用设备令牌重试
    const shouldUseDeviceRetryToken =
      this.#pendingDeviceTokenRetry && Boolean(explicitGatewayToken) && Boolean(storedToken) && isTrustedRetryEndpoint(this.opts.url)

    // 解析设备令牌（仅在无显式令牌或密码时使用）
    const resolvedDeviceToken = !(explicitGatewayToken || authPassword) ? (storedToken ?? undefined) : undefined

    // 选择认证令牌
    const authToken = explicitGatewayToken ?? resolvedDeviceToken

    return {
      authToken,
      authDeviceToken: shouldUseDeviceRetryToken ? (storedToken ?? undefined) : undefined,
      authPassword,
      resolvedDeviceToken,
      storedToken: storedToken ?? undefined,
      canFallbackToShared: Boolean(storedToken && explicitGatewayToken),
    }
  }

  /**
   * 发送Gateway请求
   * 向Gateway服务器发送RPC请求并等待响应
   * @param method - RPC方法名
   * @param params - 请求参数
   * @returns Promise，解析为响应数据
   */
  request(method, params) {
    // 检查连接状态
    if (!this.#ws || this.#ws.readyState !== WebSocket.OPEN) {
      return Promise.reject(new Error('gateway not connected'))
    }

    console.log('request:', method, params)

    // 生成请求ID
    const id = generateUUID()
    const frame = { type: 'req', id, method, params }

    // 创建Promise并存储回调
    const p = new Promise((resolve, reject) => {
      this.#pending.set(id, { resolve: (v) => resolve(v), reject })
    })

    // 发送请求
    this.#ws.send(JSON.stringify(frame))
    return p
  }

  /**
   * 将连接请求加入队列
   * 延迟发送连接请求以等待connect.challenge事件
   */
  #queueConnect() {
    this.#connectNonce = null
    this.#connectSent = false

    // 清除之前的定时器
    if (this.#connectTimer !== null) {
      window.clearTimeout(this.#connectTimer)
    }

    // 延迟750ms后发送连接请求
    this.#connectTimer = window.setTimeout(() => {
      void this.#sendConnect()
    }, 750)
  }
}
