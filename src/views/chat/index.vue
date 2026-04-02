<script setup>
import { ChatClient } from './ChatClient.js'
import { ref } from 'vue'

defineOptions({ name: 'ChatPage' })

const questionContent = ref('Who are you?')

const client = new ChatClient({
  url: import.meta.env.VITE_WS_URL,
})
client.start()

function handleSend() {
  client.request('chat.question', {
    content: questionContent.value,
  })
}
</script>

<template>
  <div class="chat-page">
    <h1>Chat page.</h1>
    <n-input v-model:value="questionContent" type="textarea"></n-input>
    <n-button @click="handleSend">Send</n-button>
  </div>
</template>
