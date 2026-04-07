/*
 * Markdown ECharts 图表插件
 * Forked from: [markdown-it-vue@v1.1.7](https://github.com/ravenq/markdown-it-vue/blob/master/src/markdown-it-plugin-echarts.js)
 *
 * 二开原因：
 * - 缺省宽度 400px 过小且无法调整；
 * - 增加：图表渲染防抖；
 */

/**
 * MarkdownIt 实例
 * @typedef {import('markdown-it').default} MarkdownIt
 */

import { MD_ECHARTS_CLASS_NAME } from '../constants'

/**
 * ECharts 图表插件
 * - 生成图表容器元素
 * - 生成图表占位元素
 * @param {MarkdownIt} md
 */
export default function echartsPlugin(md) {
  const temp = md.renderer.rules.fence.bind(md.renderer.rules)

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (token.info === 'echarts') {
      const code = token.content.trim()
      try {
        const json = JSON.parse(code)
        const width = json.width ? json.width + 'px' : '100%'
        const height = (json.height || 400) + 'px'
        return `
<div class="${MD_ECHARTS_CLASS_NAME.CONTAINER}" style="width:${width};height:${height};">
    <code class="${MD_ECHARTS_CLASS_NAME.CONFIG}" style="display: none;">${JSON.stringify(json)}</code>
    <div class="${MD_ECHARTS_CLASS_NAME.PLACEMENT}" style="height:100%;">
        <div style="line-height: ${height};text-align: center;opacity: 0.7;">图表生成中...</div>
    </div>
</div>
`
      } catch (e) {
        // JSON.parse exception
        console.error('[MarkdownItPluginECharts>JSON.parse exception]:\n', e)
        return `<pre>${e}</pre>`
      }
    }
    return temp(tokens, idx, options, env, self)
  }
}
