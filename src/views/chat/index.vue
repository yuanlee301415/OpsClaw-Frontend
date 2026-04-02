<script setup>
import { reactive, ref } from 'vue'
import { generateUUID } from '@/utils/uuid.js'
import { ChatClient } from './ChatClient.js'
import ChatInput from './modules/ChatInput/index.vue'
import ChatMessages from './modules/ChatMessages/index.vue'

defineOptions({ name: 'ChatPage' })

const client = new ChatClient({
  url: import.meta.env.VITE_WS_URL,
})

const questionContent = ref('Who are you?')
const messages = reactive([
  {
    id: 1,
    question: 'Who are you?',
    answer:
      "I am nanobot 🐈, a personal AI assistant. I am here to help you with any tasks or questions you may have. Whether it's managing your schedule, providing information, or assisting with technical tasks, I'm here to support you. How can I assist you today?",
  },
])
const chatId = (function () {
  const id = sessionStorage.getItem('OpsClaw.chatId') ?? generateUUID()
  sessionStorage.setItem('OpsClaw.chatId', id)
  console.log('chatId:', id)
  return id
})()

client.start()

function onSend(question) {
  client.request('chat.question', {
    chat_id: chatId,
    content: question,
  })

  messages.push({
    id: generateUUID(),
    question,
  })
}
</script>

<template>
  <div class="chat-page h-full flex flex-col pt-2 px-4 pb-8">
    <div class="flex-1">
      <ChatMessages :messages="messages" />
    </div>
    <ChatInput v-model:question="questionContent" @send="onSend" />
  </div>
</template>
