<!--
ECharts test
-->

<script setup>
import { ref } from 'vue'
import Markdown from '@/components/Markdown'

defineOptions({ name: 'EChartsLeastConfig' })

const basics = [
  ['bar', '柱状图'],
  ['bar-stack', '柱状图-堆叠'],
  ['mix-line-bar', '折柱混合'],
  ['pie-basic', '饼图-基础'],
  ['pie-borderRadius', '饼图-圆角环形'],
  ['line-basic', '折线图-基础'],
  ['area-stack', '折线图-堆叠'],
  ['historical-curve', '折线图-历史记录曲线图'],
  ['graph-force', '拓扑图-链路图'],
  ['flex-chart', '图表-并排'],
  ['gauge-grade', '仪表盘-等级'],
  ['dataset-link', '联动和共享数据集'],
]

const activeName = ref('bar')
const data = ref('')

handleClick(activeName.value)

function handleClick(fileName) {
  activeName.value = fileName
  import(`./data/${fileName}.js`).then((res) => {
    data.value = res.default
  })
}
</script>

<template>
  <div class="echarts-test-page">
    <nav>
      <n-button
        v-for="[fileName, title] of basics"
        :key="fileName"
        :type="activeName === fileName ? 'primary' : ''"
        size="small"
        text
        class="m-1"
        @click="handleClick(fileName)"
        >{{ title }}</n-button
      >
    </nav>
    <div class="con">
      <Markdown :text="data" />
    </div>
  </div>
</template>

<style scoped lang="less">
.page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  nav {
    border-bottom: 1px solid darkblue;
    a {
      margin: 0 5px;
    }
  }
  .con {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
