import { generateUUID } from '@/utils/uuid.js'
import { getAuthToken } from '@/utils/authToken.js'

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
   * @param {object} opts
   * @param {string} opts.url
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
   * @param {string} method - 方法名
   * @param {object} params - 请求参数
   * @param {string} content - 问题内容
   */
  request(method, params) {
    // 检查连接状态
    if (!this.#ws || this.#ws.readyState !== WebSocket.OPEN) {
      return Promise.reject(new Error('WS not connected!'))
    }

    // 生成请求ID
    const chat_id = generateUUID()
    const frame = {
      method,
      chat_id,
      sender_id: getAuthToken(),
      content: params.content,
      metadata: {},
    }

    console.log('request:', frame)
    // 发送请求
    this.#ws.send(JSON.stringify(frame))
  }

  #connect() {
    if (this.#closed) return
    this.#ws = new WebSocket(this.opts.url)
    this.#ws.addEventListener('open', () => this.#queueConnect())
    this.#ws.addEventListener('message', (evt) => this.#handleMessage(evt.data ?? ''))
    this.#ws.addEventListener('close', (evt) => {
      this.#ws = null
      this.opts.onClose?.(evt)
    })
    this.#ws.addEventListener('error', (error) => {
      console.error(error)
    })
  }

  #queueConnect() {
    console.warn('WS 连接成功@', new Date())
  }

  #handleMessage(raw) {
    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch {
      return
    }

    this.opts.onEvent?.(parsed)
  }
}
