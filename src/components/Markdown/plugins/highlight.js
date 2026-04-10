/*
 * 代码块高亮
 * */

/**
 * MarkdownIt 实例
 * @typedef  {import("markdown-it")} MarkdownIt
 */

import 'highlight.js/styles/github.css'
import hljs from 'highlight.js'
import { MD_CODE_BLOCK_CLASS_NAME } from '../constants'

// 代码块起始 id
let seedId = (Math.random() * 1e8) | 0

/**
 * 高亮代码块
 * @param {MarkdownIt} md
 * @param {string} code 代码
 * @param {string} language 语言
 * @param {string} codeId 代码块 id
 * @return {string} HTML 代码片断
 */
const highlightCode = (md, code, language, codeId) => {
  let html = ''
  try {
    html = hljs.highlight(code, { language, ignoreIllegals: true }).value.trim()
  } catch (err) {
    html = md.utils.escapeHtml(code)
    console.warn(err)
  }
  html = `<code id="${codeId}">${html
    .split(/[\n\r]/g)
    .map((line) => `<span class="${MD_CODE_BLOCK_CLASS_NAME.LINE}">${line}</span>`)
    .join('\n')}</code>`
  return html
}

/**
 * 高亮代码块
 * @param {MarkdownIt} md
 * @param {string} code 代码
 * @param {string} language 语言
 * @return {string} HTML 代码片断
 */
export default function highlight(md, code, language) {
  const codeId = 'code__' + ++seedId
  let html = `<div class="${MD_CODE_BLOCK_CLASS_NAME.TOOL_CONTAINER}"><span>${language}</span><button class="${MD_CODE_BLOCK_CLASS_NAME.COPY_BUTTON} icon-button iconfont icon-fuzhi1" data-clipboard-target="#${codeId}"/></div>`
  html += highlightCode(md, code, language, codeId)
  return `<pre class="${MD_CODE_BLOCK_CLASS_NAME.CONTAINER}" data-language="${language}">${html}</pre>`
}
