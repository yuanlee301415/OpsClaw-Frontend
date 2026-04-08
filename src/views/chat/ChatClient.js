import { generateUUID } from '@/utils/uuid.js'
import { getAuthToken } from '@/utils/authToken.js'

// 4008 = 应用程序自定义代码（浏览器拒绝1008"策略违规"）
const CONNECT_FAILED_CLOSE_CODE = 4008

// 握手-方法名
const CONNECT_REQ_METHOD = 'connect.req'

// 发送问题-方法名
const CHAT_QUESTION_METHOD = 'chat.question'

// 接收回答-方法名
const CHAT_ANSWER_METHOD = 'chat.answer'

export class ChatClient {
  /**
   * @type {WebSocket}
   */
  #ws

  /**
   * @type {boolean}
   */
  #closed = true

  /**
   * @type {boolean}
   */
  #connectSent

  /**
   * @type {number}
   */
  #connectTimer

  /**
   * @type {Map<string, object>}
   */
  #pending = new Map()

  static CHAT_QUESTION_METHOD = CHAT_QUESTION_METHOD
  static CHAT_ANSWER_METHOD = CHAT_ANSWER_METHOD

  /**
   * @param {object} opts
   * @param {string} opts.url
   * @param {string} opts.chatId
   * @param {Function} opts.onEvent
   * @param {Function} opts.onClose
   */
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
    this.#flushPending(new Error('WS stopped'))
  }

  /**
   * 获取连接状态
   * @returns 如果WebSocket处于打开状态返回true
   */
  get connected() {
    return this.#ws?.readyState === WebSocket.OPEN
  }

  /**
   * @param {string} method - 方法名
   * @param {object} params - 请求参数
   * @param {string} params.content - 问题内容
   * @param {string} params.chatId - 会话 Id
   * @param {string} params.msgId - 会话 Id
   */
  request(method, params) {
    // 检查连接状态
    if (!this.#ws || this.#ws.readyState !== WebSocket.OPEN) {
      return Promise.reject(new Error('WS not connected!'))
    }

    const runId = generateUUID()
    const frame = {
      method,
      chat_id: this.opts.chatId,
      sender_id: getAuthToken(),
      content: params.content,
      metadata: {
        runId,
        msgId: params.msgId,
      },
    }
    console.log('request>frame:', frame)

    // 创建Promise并存储回调
    const p = new Promise((resolve, reject) => {
      this.#pending.set(runId, { resolve: (v) => resolve(v), reject })
    })

    // 发送请求
    this.#ws.send(JSON.stringify(frame))
    return p
  }

  #connect() {
    if (this.#closed) return
    this.#ws = new WebSocket(this.opts.url)
    this.#ws.addEventListener('open', () => this.#queueConnect())
    this.#ws.addEventListener('message', (evt) => this.#handleMessage(evt.data ?? ''))
    this.#ws.addEventListener('close', (evt) => {
      console.error('WS 连接已关闭：\n', evt)
      this.#ws = null
      this.#flushPending(new Error(`WS closed: ${JSON.stringify(evt)}`))
      this.opts.onClose?.(evt)
      // Todo: 重连
    })
    this.#ws.addEventListener('error', (error) => {
      console.error('WS 连接失败：\n', error)
    })
  }

  #queueConnect() {
    this.#connectSent = false

    // 清除之前的定时器
    if (this.#connectTimer !== null) {
      clearTimeout(this.#connectTimer)
    }

    // 延迟750ms后发送连接请求
    this.#connectTimer = setTimeout(() => {
      void this.#sendConnect()
    }, 750)
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
      clearTimeout(this.#connectTimer)
      this.#connectTimer = null
    }

    // 发送connect请求并处理响应
    void this.request(CONNECT_REQ_METHOD, {
      chat_id: this.opts.chatId,
    })
      .then((hello) => this.#handleConnectHello(hello))
      .catch((err) => this.#handleConnectFailure(err))
  }

  /**
   * 处理连接握手成功
   * 保存设备令牌并触发回调
   * @param hello - Gateway握手成功响应
   */
  #handleConnectHello(hello) {
    console.log('handleConnectHello:', hello)
    // 触发握手成功回调
    this.opts.onHello?.(hello)
  }

  #handleMessage(raw) {
    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch {
      console.error('[handleMessage]::解析失败：\n', { raw })
      return
    }

    // 处理响应消息
    const {
      method,
      metadata: { runId },
    } = parsed

    if (method === CHAT_ANSWER_METHOD) {
      this.opts.onEvent(parsed)
      return
    }

    const pending = this.#pending.get(runId)
    if (!pending) return
    this.#pending.delete(runId)
    if (parsed.ok) {
      pending.resolve(parsed)
    } else {
      pending.reject(parsed)
    }
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
   * 处理连接失败
   * 分析错误并决定是否应该使用设备令牌重试
   * @param err - 错误对象
   */
  #handleConnectFailure(err) {
    console.error('WS 连接失败>err:\n', err)
    // 提取错误代码和恢复建议
    // 关闭WebSocket连接
    this.#ws?.close(CONNECT_FAILED_CLOSE_CODE, 'connect failed')
  }
}
