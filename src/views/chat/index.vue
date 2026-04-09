<script setup>
import { computed, reactive, ref, useTemplateRef } from 'vue'
import { generateUUID } from '@/utils/uuid.js'
import { ChatMessage, Message } from '@/models/ChatMessage.js'
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
const messages = reactive(ChatMessage.from([]))
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
  url: window.__CONFIG__.WS_URL,
  chatId,
  onHello() {
    console.warn('WS 连接成功！', new Date())
    connected.value = true
  },
  onEvent(data) {
    if (!data.ok) {
      console.error('Event>error:\n', data)
      return
    }
    if (data.method === ChatClient.CHAT_ANSWER_METHOD) {
      handleChatEvent(data)
      return
    }
    console.error('未知 Event:\n', data)
  },
  onClose() {
    connected.value = false
    window.$message.error('WebSocket 连接失败！')
  },
})

client.start()

/**
 * 发送问题
 * @param {string} questionContent 问题内容
 */
function onSend(questionContent) {
  if (!canSend.value) return

  const msgId = generateUUID()
  const timestamp = Date.now()

  /**
   * @type {ChatMessage}
   */
  const message = reactive(
    new ChatMessage({
      id: msgId,
      question: {
        key: [Message.ROLE_USER, timestamp, messages.length].join(':'),
        content: questionContent,
        timestamp,
      },
      answers: [],
      _progress: true,
    }),
  )
  progress.value = true
  messages.push(message)
  chatMessagesRef.value?.scrollIntoView()

  void client.request(ChatClient.CHAT_QUESTION_METHOD, {
    msgId,
    content: questionContent,
  })
}

function handleChatEvent(data) {
  console.log('handleChatEvent:', data)
  const {
    chat_id: _chatId,
    content,
    metadata: { msgId, _progress, _tool_hint },
  } = data
  const message = messages.at(-1)
  const timestamp = Date.now()

  if (_chatId !== chatId || message.id !== msgId) {
    console.error('忽略的 ChatEvent:', data)
    return
  }

  if (_tool_hint) {
    // 工具调用
    message.answers.push(
      new Message({
        key: [Message.ROLE_TOOL, timestamp, messages.length].join(':'),
        role: Message.ROLE_TOOL,
        content,
      }),
    )
  } else {
    message.answers.push(
      new Message({
        key: [Message.ROLE_ASSISTANT, timestamp, messages.length].join(':'),
        role: Message.ROLE_ASSISTANT,
        content,
      }),
    )
  }
  message._progress = !!_progress
  progress.value = !!_progress
  chatMessagesRef.value?.scrollIntoView()
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
