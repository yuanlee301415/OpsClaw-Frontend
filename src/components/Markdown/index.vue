<!--
Markdown 渲染-组件
 * Todo: 同步 BTAI 最新版本（组件、图表配置函数）
-->
<script setup>
import 'github-markdown-css/github-markdown-light.css'
import { nextTick, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import markdownIt from 'markdown-it'
import * as echarts from 'echarts'
import debounce from 'lodash/debounce'
import highlight from './plugins/highlight'
import markdownItECharts from './plugins/markdown-it-echarts'
import markdownItTablePaginationPlugin from './plugins/markdown-it-table-pagination'
import tablePagination from './plugins/table-pagination'
import { createEChartsConfig } from './echarts/config'
import { MD_ECHARTS_CLASS_NAME } from './constants'

defineOptions({ name: 'ChatMarkdown' })

const props = defineProps({
  text: String,
})

const html = ref('')

const mdRef = useTemplateRef('mdRef')

// MarkdownIt 实例
const md = markdownIt({
  html: true,
  linkify: true,
  typographer: false, // 禁用 智能引号 功能
  highlight: function (str, lang) {
    return highlight(md, str, lang)
  },
})
// ECharts 图表插件
md.use(markdownItECharts)

// 表格分页
md.use(markdownItTablePaginationPlugin)

/**
 * 图表实例
 * @type {Set<ECharts>}
 */
const chartInstanceSet = new Set()

/**
 * 组件根元素尺寸变化-监听器
 * @type {ResizeObserver}
 */
const resizeObserver = new ResizeObserver(
  debounce(() => {
    if (!chartInstanceSet.size) return
    chartInstanceSet.forEach((chart) => {
      chart.resize()
      nextTick(() => {
        chart.resize()
      })
    })
  }, 200),
)

/**
 * 重新渲染-定时器
 * @type {number}
 */
let reRendererTimer

watch(
  () => props.text,
  (val) => {
    html.value = md.render(val, {
      docId: Math.random().toString(36).substring(2),
    })
    nextTick(() => {
      clearTimeout(reRendererTimer)
      reRendererTimer = setTimeout(() => {
        generateCharts()
        bindTablePagination()
      }, 500)
    })
  },
  {
    immediate: true,
  },
)

onMounted(() => {
  resizeObserver.observe(mdRef.value)
})

onUnmounted(() => {
  disposeCharts()
  resizeObserver.disconnect()
})

// 生成图表
function generateCharts() {
  disposeCharts()
  if (!mdRef.value) return
  mdRef.value.querySelectorAll(`.${MD_ECHARTS_CLASS_NAME.CONTAINER}`).forEach((element) => {
    try {
      const options = JSON.parse(element.querySelector(`.${MD_ECHARTS_CLASS_NAME.CONTAINER} > .${MD_ECHARTS_CLASS_NAME.CONFIG}`).textContent)
      const config = createEChartsConfig(options)
      const chart = echarts.init(element.querySelector(`.${MD_ECHARTS_CLASS_NAME.PLACEMENT}`))
      config.events &&
        config.events.forEach((fn) => {
          fn(chart)
        })
      chart.setOption(config)
      chartInstanceSet.add(chart)
    } catch (e) {
      console.error('[generateCharts]::\n', e)
      element.outerHTML = `<pre>${e}</pre>`
    }
  })
}

// 销毁图表
function disposeCharts() {
  if (!chartInstanceSet.size) return

  chartInstanceSet.forEach((chart) => {
    chart.dispose()
    chartInstanceSet.delete(chart)
  })
}

// 表格分页
function bindTablePagination() {
  tablePagination(mdRef.value)
}
</script>

<template>
  <div class="chat-md" ref="mdRef">
    <div v-html="html" class="markdown-body"></div>
  </div>
</template>

<style lang="less">
@import 'styles/index.less';
</style>
