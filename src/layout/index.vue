<script setup>
import Header from './modules/Header/index.vue'
import Sider from './modules/Sider/index.vue'
import Content from './modules/Content/index.vue'

defineOptions({ name: 'LayoutIndex' })
</script>

<template>
  <n-layout class="layout-container size-full" content-class="flex flex-col overflow-hidden" style="--sider-width: 250px">
    <Header />

    <div class="layout-main-container flex-1 flex overflow-hidden">
      <Sider />

      <div class="layout-right flex-1 flex flex-col overflow-hidden">
        <Content />
      </div>
    </div>
  </n-layout>
</template>

<style scoped lang="less">
.layout-container {
  background-color: var(--bg);
}
</style>
