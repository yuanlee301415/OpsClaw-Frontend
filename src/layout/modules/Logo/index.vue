<script setup>
defineOptions({ name: 'LayoutLogo' })

const NAME = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <n-flex class="header-logo" align="center">
    <img src="/favicon.svg" width="30" />
    <n-h3 class="m-0">{{ NAME }}</n-h3>
  </n-flex>
</template>
