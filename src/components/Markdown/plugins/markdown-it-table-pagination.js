/*
 * 表格分页插件
 * */

/**
 * MarkdownIt 实例
 * @typedef {import('markdown-it').default} MarkdownIt
 */

/**
 * 插件配置
 * @typedef {{pageSize: number}} PaginationOptions
 * - pageSize: 每页行数
 */

import { MD_CLASS_NAME, MD_PAGINATION_CLASS_NAME, PAGE_SIZE, PAGER_BUTTON_MAX } from '../constants'

/**
 * Token#nesting -> Number
 *
 * Level change (number in {-1, 0, 1} set), where:
 *
 * -  `1` means the tag is opening
 * -  `0` means the tag is self-closing
 * - `-1` means the tag is closing
 **/
const NESTING = {
  OPEN: 1,
  CLOSE: -1,
  SELF: 0,
}

// 表格 Token 名称
const TABLE_TOKEN_TYPE = {
  // table 开始标签
  TABLE_OPEN: 'table_open',

  // table 结束标签
  TABLE_CLOSE: 'table_close',

  // tbody 开始标签
  TBODY_OPEN: 'tbody_open',

  // tbody 结束标签
  TBODY_CLOSE: 'tbody_close',

  // tr 结束标签
  TR_CLOSE: 'tr_close',
}

/**
 * Token 构造器
 * @class
 */
let Token

/**
 * 创建一个 Token 实例，用于生成 HTML 标签
 * @param {string} tag - HTML 标签名称
 * @param {1, 0, -1} nesting - 标签嵌套级别
 * @param {Array} [attrs] - 标签属性数组
 * @returns {Token} - 生成的 Token 对象
 */
function createToken(tag, nesting, attrs) {
  const token = new Token(`${tag}_${nesting === NESTING.OPEN ? 'open' : nesting === NESTING.CLOSE ? 'close' : ''}`, tag, nesting)
  if (nesting === NESTING.OPEN && attrs) {
    // 去除值为 undefined 的属性
    token.attrs = attrs.filter(([, val]) => val !== void 0)
  }
  return token
}

/**
 * 创建一对 Token 实例，用于生成 HTML 标签
 * @param {string} tag - 标签名称
 * @param {Array} [attrs] - 标签属性数组
 * @param {string|number} [content] - 标签内的文本内容
 * @returns {Token[]} - 生成的一对 Token 对象
 */
function createParisTokens(tag, attrs, content) {
  const tokens = [createToken(tag, NESTING.OPEN, attrs)]
  tokens.push(createToken(tag, NESTING.CLOSE))
  if (content) {
    // 创建文本 Token
    const textToken = new Token('text', '', NESTING.SELF)
    textToken.content = content
    tokens.splice(-1, 0, textToken)
  }
  return tokens
}

/**
 * 创建分页组件的 Token 数组，用于生成 HTML 分页栏
 * @param {number} tbodyCount - 总页数
 * @param {number} rowCount - 总条数
 * @returns {Array|void} - 分页组件的 Token 数组
 */
function createPagination(tbodyCount, rowCount) {
  if (tbodyCount <= 1) return

  // 分页容器的 tokens
  const paginationTokens = createParisTokens('div', [['class', MD_PAGINATION_CLASS_NAME.CONTAINER]])

  // 总条数的 tokens
  const totalTokens = createParisTokens('span', null, `共 ${rowCount} 条`)

  // 上一页按钮的 tokens
  const prevTokens = createParisTokens(
    'button',
    [
      ['class', MD_PAGINATION_CLASS_NAME.PREV_BUTTON],
      ['disabled', 'disabled'],
      ['data-page', 1],
    ],
    '<',
  )

  // 下一页按钮的 tokens
  const nextTokens = createParisTokens(
    'button',
    [
      ['class', MD_PAGINATION_CLASS_NAME.NEXT_BUTTON],
      ['data-page', 2],
    ],
    '>',
  )

  // 页码按钮的 tokens
  const pageTokens = [
    createToken('div', NESTING.OPEN, [['class', MD_PAGINATION_CLASS_NAME.BUTTON_CONTAINER]]),

    Array.from({ length: tbodyCount }).map((_, idx) => {
      const tokens = createParisTokens(
        'a',
        [
          ['data-page', idx + 1],
          ['class', idx === 0 ? MD_PAGINATION_CLASS_NAME.ACTIVE_BUTTON : void 0],
          ['class', tbodyCount <= PAGER_BUTTON_MAX || idx + 1 < PAGER_BUTTON_MAX || idx + 1 === tbodyCount ? void 0 : MD_CLASS_NAME.INVISIBLE],
        ],
        idx + 1,
      )
      if (tbodyCount <= PAGER_BUTTON_MAX) return tokens

      if (idx === 0)
        return [
          tokens,

          // 左边折叠页码按钮提示
          createParisTokens('span', [['class', [MD_PAGINATION_CLASS_NAME.LEFT_COLLAPSED_POINTER, MD_CLASS_NAME.INVISIBLE].join(' ')]], '...'),
        ]

      if (idx === tbodyCount - 2)
        return [
          tokens,

          // 右边折叠页码按钮提示
          createParisTokens('span', [['class', MD_PAGINATION_CLASS_NAME.RIGHT_COLLAPSED_POINTER]], '...'),
        ]
      return tokens
    }),

    createToken('div', NESTING.CLOSE),
  ].flat(Infinity)

  // 将所有的 tokens 组合在一起
  return [paginationTokens[0], ...totalTokens, ...prevTokens, ...pageTokens, ...nextTokens, paginationTokens[1]]
}

/**
 * 表格分页插件
 * @param {MarkdownIt} md - MarkdownIt 实例
 * @param {PaginationOptions} [options]
 */
export default function tablePaginationPlugin(md, options) {
  md.core.ruler.after('block', 'table_pagination', tablePagination)

  const { pageSize = PAGE_SIZE } = { ...options }

  /**
   * 对markdown中的表格进行分页处理
   * @param {Object} state - 包含 tokens 的对象
   */
  function tablePagination(state) {
    // 默认每页显示的行数
    const MAX_ROWS_PER_PAGE = pageSize

    // 用于存储处理后的 tokens
    const newTokens = []

    // 标记是否在表格内部
    let inTable = false

    // 标记是否在 tbody 内部
    let inTbody = false

    // 记录表格行数
    let rowCount = 0

    // 记录tbody的个数，用于分页
    let tbodyCount = 0

    // Token 构造器
    Token = state.Token

    // 遍历原始 tokens
    for (let i = 0; i < state.tokens.length; i++) {
      const token = state.tokens[i]
      newTokens.push(token)

      // table 开始标签，插入 div 包裹表格，用于后续的分页处理
      if (token.type === TABLE_TOKEN_TYPE.TABLE_OPEN) {
        const wrapperOpen = createToken('div', NESTING.OPEN, [['class', MD_CLASS_NAME.TABLE_CONTAINER]])
        newTokens.splice(-1, 0, wrapperOpen)
        inTable = true
      }

      // table 结束标签，插入分页内容和 div 结束标签
      else if (token.type === TABLE_TOKEN_TYPE.TABLE_CLOSE) {
        const wrapperClose = createToken('div', NESTING.CLOSE)
        const pages = createPagination(tbodyCount, rowCount + 1 /*修正最后一行未计入总数*/)
        rowCount = 0
        tbodyCount = 0
        inTable = false
        pages && newTokens.push(...pages)
        newTokens.push(wrapperClose)
      }

      // 在 table 内部遇到 tbody 开始标签
      else if (inTable && token.type === TABLE_TOKEN_TYPE.TBODY_OPEN) {
        tbodyCount = 1
        inTbody = true
      }

      // 在 table 内部遇到 tbody 结束标签
      else if (inTable && token.type === TABLE_TOKEN_TYPE.TBODY_CLOSE) {
        inTbody = false
      }

      // 如果不在 table 内部或不在 tbody 内部，跳过后续处理
      if (!inTable || !inTbody) continue

      // tr 签结束，且下一个标签不是 tbody 结束标签，进行分页处理
      if (token.type === TABLE_TOKEN_TYPE.TR_CLOSE && state.tokens[i + 1] && state.tokens[i + 1].type !== TABLE_TOKEN_TYPE.TBODY_CLOSE) {
        rowCount++
        if (rowCount && rowCount % MAX_ROWS_PER_PAGE === 0) {
          // 每达到最大行数，关闭当前 tbody ，打开新的 tbody，用于分页
          const tbodyTokens = createParisTokens('tbody', [['class', MD_CLASS_NAME.INVISIBLE]])
          newTokens.push(tbodyTokens[1], tbodyTokens[0])
          tbodyCount++
        }
      }
    }

    // 更新状态对象的 tokens，使用处理后的 tokens
    state.tokens = newTokens
  }
}
