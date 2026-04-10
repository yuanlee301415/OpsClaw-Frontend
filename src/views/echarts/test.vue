<!--
Markdown 图表测试
-->
<template>
  <div class="page">
    <h1>Markdown 图表测试</h1>
    <div class="con">
      <div class="code">
        <div class="input">
          <textarea v-model="text" spellcheck="false" />
        </div>
      </div>
      <div class="charts">
        <Markdown :text="text" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Markdown from '@/components/Markdown'

defineOptions({ name: 'EChartsTest' })

const text = ref('')
</script>

<style scoped lang="less">
.page {
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  .con {
    flex: 1;
    display: flex;
    > div {
      box-sizing: border-box;
      height: 100%;
    }
    .code {
      width: 40vw;
      display: flex;
      flex-direction: column;
      .input {
        flex: 1;
        margin-top: 10px;
        textarea {
          box-sizing: border-box;
          border-radius: 5px;
          background: none;
          width: 100%;
          height: 100%;
          border: 1px solid lightgray;
          outline: none;
          &.error {
            border-color: #f00 !important;
          }
          &:focus {
            border-color: #409eff;
          }
        }
      }
    }
    .charts {
      margin-left: 10px;
      width: 60vw;
      display: flex;
      > * {
        width: 100%;
        margin: auto 0;
      }
    }
  }
}
</style>
