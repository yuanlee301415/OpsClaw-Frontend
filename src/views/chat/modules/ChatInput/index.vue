<script setup>
defineOptions({ name: 'ChatInput' })

const question = defineModel('question')
const emits = defineEmits(['send'])

function handleSend() {
  emits('send', question.value)
}
</script>

<template>
  <div class="chat-input">
    <n-input v-model:value="question" type="textarea"></n-input>
    <n-button @click="handleSend">Send</n-button>
  </div>
</template>

<style scoped lang="less"></style>
