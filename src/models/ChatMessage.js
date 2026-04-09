/*
 * 对话消息 Model
 * */

const ROLE_USER = 'user'
const ROLE_ASSISTANT = 'assistant'
const ROLE_TOOL = 'tool'

export class Message {
  /**
   * @type {string}
   */
  key

  /**
   * 消息角色
   * @type {ROLE_USER|ROLE_ASSISTANT|ROLE_TOOL}
   */
  role

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
    const { key, role, content, timestamp = Date.now() } = { ..._ }
    this.key = key
    this.role = role
    this.content = content
    this.timestamp = timestamp
  }

  static ROLE_USER = ROLE_USER
  static ROLE_ASSISTANT = ROLE_ASSISTANT
  static ROLE_TOOL = ROLE_TOOL

  /**
   * 获取时分
   * @return {string} `HH:MM`
   */
  get timeString() {
    const date = new Date(this.timestamp)
    if (!date.getTime()) return ''
    return [String(date.getHours()).padStart(2, '0'), String(date.getMinutes()).padStart(2, '0')].join(':')
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
   * @type {Message[]}
   */
  answers

  /**
   * 持续回复中
   * Todo: 持续分段回复 `ROLE_ASSISTANT` 消息
   * @type {boolean}
   */
  _progress

  /**
   * @param {ChatMessage} _
   */
  constructor(_) {
    const { id, question, answers, _progress } = { ..._ }
    this.id = id
    this.question = new Message(question)
    this.answers = Message.from(answers)
    this._progress = _progress
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
