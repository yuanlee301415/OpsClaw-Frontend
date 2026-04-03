<script setup>
defineOptions({ name: 'ChatInput' })

const question = defineModel('question')
const emits = defineEmits(['send'])

function handleSend() {
  emits('send', question.value)
}
</script>

<template>
  <div class="chat-input-container relative flex flex-col">
    <textarea v-model="question"></textarea>
    <n-button @click="handleSend">Send</n-button>
  </div>
</template>

<style scoped lang="less">
.chat-input-container {
  border: 1px solid var(--border);
  background-color: var(--card);
  border-radius: var(--radius-lg);
  flex-shrink: 0;
}
</style>
