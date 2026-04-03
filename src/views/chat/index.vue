<script setup>
import { reactive, ref, useTemplateRef } from 'vue'
import { generateUUID } from '@/utils/uuid.js'
import { ChatMessage } from '@/models/ChatMessage.js'
import { ChatClient } from './ChatClient.js'
import ChatInput from './modules/ChatInput/index.vue'
import ChatMessages from './modules/ChatMessages/index.vue'

defineOptions({ name: 'ChatPage' })

const chatId = (function () {
  const id = sessionStorage.getItem('OpsClaw.chatId') ?? generateUUID()
  sessionStorage.setItem('OpsClaw.chatId', id)
  console.log('chatId:', id)
  return id
})()

const client = new ChatClient({
  url: import.meta.env.VITE_WS_URL,
  chatId,
  onHello() {
    console.warn('WS 连接成功！', new Date())
  },
  onEvent(data) {
    console.log('onEvent>data:', data)
  },
})

const questionContent = ref('Who are you?')
const messages = reactive(
  ChatMessage.from([
    /*  {
    id: 1,
    question: {
      content: 'Who are you?',
      timestamp: 1775208323000
    },
    answer: {
      content: '"I am nanobot 🐈, a personal AI assistant. I am here to help you with any tasks or questions you may have. Whether it\'s managing your schedule, providing information, or assisting with technical tasks, I\'m here to support you. How can I assist you today?",',
      timestamp: 1775208325000
    }
  }*/
  ]),
)
const chatMessagesRef = useTemplateRef('chatMessagesRef')
const pending = ref(false)

client.start()

async function onSend(questionContent) {
  const msgId = generateUUID()

  /**
   * @type {ChatMessage}
   */
  const message = reactive(
    new ChatMessage({
      id: msgId,
      question: {
        content: questionContent,
        timestamp: Date.now(),
      },
      _pending: true,
    }),
  )

  pending.value = true
  messages.push(message)
  chatMessagesRef.value?.scrollIntoView()

  const { ok, method, timestamp, content } = await client.request(ChatClient.CHAT_QUESTION_METHOD, {
    msgId,
    content: questionContent,
  })
  console.log('answer>res:', { ok, method, timestamp, content })
  message._pending = false
  message.answer.timestamp = Date.now()
  message.answer.content = content
  pending.value = false
  chatMessagesRef.value?.scrollIntoView()
}
</script>

<template>
  <div class="chat-page h-full flex flex-col gap-row-4 pt-2 px-4 pb-8">
    <div class="flex-1 overflow-y-auto">
      <ChatMessages :messages="messages" ref="chatMessagesRef" />
    </div>
    <ChatInput v-model:questionContent="questionContent" :disabled="pending" @send="onSend" />
  </div>
</template>
