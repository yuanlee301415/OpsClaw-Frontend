<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { zhCN, dateZhCN } from 'naive-ui'

onMounted(() => {
  const leftStyle = 'background-color:#2f353a;color:#fff;padding:0 5px;line-height:1.2rem;border-radius:0.2rem 0 0 0.2rem;'
  const rightStyle = 'background-color:#17a2b8;color:#fff;padding:0 5px;line-height:1.2rem;border-radius:0 0.2rem 0.2rem 0;'
  console.debug(`%c MODE %c ${import.meta.env.MODE}`, leftStyle, rightStyle)
  // eslint-disable-next-line no-undef
  console.debug(`%c VERSION %c ${__APP_VERSION__}`, leftStyle, rightStyle)
  // eslint-disable-next-line no-undef
  console.debug(`%c BUILD_TIME %c ${__APP_BUILD_TIME__}`, leftStyle, rightStyle)
})
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" class="h-full">
    <n-notification-provider>
      <RouterView />
    </n-notification-provider>
  </n-config-provider>
</template>
