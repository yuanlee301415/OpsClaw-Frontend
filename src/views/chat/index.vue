<script setup>
import { computed, reactive, ref, useTemplateRef } from 'vue'
import { generateUUID } from '@/utils/uuid.js'
import { ChatMessage } from '@/models/ChatMessage.js'
import { ChatClient } from './ChatClient.js'
import ChatInput from './modules/ChatInput/index.vue'
import ChatMessages from './modules/ChatMessages/index.vue'
import ChatCards from './modules/ChatCards/index.vue'

defineOptions({ name: 'ChatPage' })

const chatId = (function () {
  const id = sessionStorage.getItem('OpsClaw.chatId') ?? generateUUID()
  sessionStorage.setItem('OpsClaw.chatId', id)
  console.log('chatId:', id)
  return id
})()
const questionContent = ref(import.meta.env.DEV ? '查询今天的天气，并将结果以附件的形式发送给 liyuan@betamail.net' : '')
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

/**
 * WS 是否已连接
 * @type {Ref<boolean>}
 */
const connected = ref(false)

/**
 * 处理中
 * @type {Ref<boolean>}
 */
const progress = ref(false)

/**
 * 是否能发送问题
 * @type {ComputedRef<boolean>}
 */
const canSend = computed(() => connected.value && !progress.value)

const client = new ChatClient({
  url: import.meta.env.VITE_WS_URL,
  chatId,
  onHello() {
    console.warn('WS 连接成功！', new Date())
    connected.value = true
  },
  onEvent(data) {
    console.log('onEvent>data:', data)
    const {
      ok,
      method,
      chat_id: _chatId,
      content,
      metadata: { msgId, _progress, _tool_hint },
    } = data
    const message = messages.at(-1)

    if (!ok || _chatId !== chatId || method !== ChatClient.CHAT_ANSWER_METHOD || message.id !== msgId) {
      console.warn('onEvent:', data)
      return
    }
    if (!message.answer.timestamp) {
      message.answer.timestamp = Date.now()
    }
    if (_tool_hint) {
      // Todo: 工具调用
    } else {
      message.answer.content += content
    }
    message._pending = false
    progress.value = !!_progress
    chatMessagesRef.value?.scrollIntoView()
  },
  onClose() {
    connected.value = false
    window.$message.error('WebSocket 连接失败！')
  },
})

client.start()

function onSend(questionContent) {
  if (!canSend.value) return

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
      answer: {
        content: '',
      },
      _pending: true,
    }),
  )

  messages.push(message)
  chatMessagesRef.value?.scrollIntoView()
  progress.value = true
  void client.request(ChatClient.CHAT_QUESTION_METHOD, {
    msgId,
    content: questionContent,
  })
}
</script>

<template>
  <div class="chat-page h-full flex flex-col gap-row-4 pt-2 px-4 pb-8">
    <div class="flex-1 overflow-y-auto">
      <ChatMessages v-if="messages.length" :messages="messages" ref="chatMessagesRef" />
      <ChatCards v-else />
    </div>
    <ChatInput v-model:questionContent="questionContent" :can-send="canSend" @send="onSend" />
  </div>
</template>
