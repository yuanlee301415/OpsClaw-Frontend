<script setup>
defineOptions({ name: 'LayoutContent' })
</script>

<template>
  <div class="layout-content flex-1 overflow-y-auto">
    <RouterView v-slot="{ Component, route }">
      <transition name="fade-slide" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </RouterView>
  </div>
</template>

<style scoped lang="less">
.layout-content {
  padding: 10px;
  background-color: var(--bg-content);
}
</style>
