<!--
Markdown 渲染-组件
-->

<script setup>
import 'github-markdown-css/github-markdown-light.css'
import { computed } from 'vue'
import markdownIt from 'markdown-it'
import highlight from './plugins/highlight'

defineOptions({ name: 'ChatMarkdown' })

const props = defineProps({
  text: String,
})

// MarkdownIt 实例
const md = markdownIt({
  html: true,
  linkify: true,
  typographer: false, // 禁用 智能引号 功能
  highlight: function (str, lang) {
    return highlight(md, str, lang)
  },
})

const html = computed(() => {
  return md.render(props.text || '', {
    docId: Math.random().toString(36).substring(2),
  })
})
</script>

<template>
  <div class="chat-md" ref="mdRef">
    <div v-html="html" class="markdown-body"></div>
  </div>
</template>

<style lang="less">
@import 'styles/index.less';
</style>
