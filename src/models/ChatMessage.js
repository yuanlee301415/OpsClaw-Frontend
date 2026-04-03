/*
 * 对话消息
 * */

class Message {
  /**
   * 消息文本内容
   * @type {string}
   */
  content

  /**
   * 时间戳
   * @type {number}
   */
  timestamp

  /**
   * @param {Message} _
   */
  constructor(_) {
    const { content, timestamp } = { ..._ }
    this.content = content
    this.timestamp = timestamp
  }

  get timeString() {
    const date = new Date(this.timestamp)
    if (!date.getTime()) return ''
    return [String(date.getMinutes()).padStart(2, '0'), String(date.getSeconds()).padStart(2, '0')].join(':')
  }
}

export class ChatMessage {
  /**
   * @type {string}
   */
  id

  /**
   * 问题
   * @type {Message}
   */
  question

  /**
   * 回答
   * @type {Message}
   */
  answer

  /**
   * 响应中
   * @type {boolean}
   */
  _pending

  /**
   * @param {ChatMessage} _
   */
  constructor(_) {
    const { id, question, answer, _pending } = { ..._ }
    this.id = id
    this.question = new Message(question)
    this.answer = new Message(answer)
    this._pending = _pending
  }

  /**
   * 批量实例化
   * @param {Array} [list]
   * @return {ChatMessage[]|*}
   */
  static from(list) {
    return list?.map((_) => new this(_))
  }
}
