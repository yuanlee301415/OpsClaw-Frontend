<script setup>
import { reactive, ref } from 'vue'
import { ChatClient } from './ChatClient.js'
import { generateUUID } from '@/utils/uuid.js'
import { isSilentReplyStream } from './controllers/chat.js'

defineOptions({ name: 'ChatPage' })

const SETTINGS = {
  gatewayUrl: 'ws://localhost:18789',
  password: '123456',
  token: '388732ba5130f27a0fe4c6fcbb8908d3372b34a6b75025eb',
}
let client = null

const connected = ref(false)
const chatMessages = reactive([])
const chatMessage = ref('今天天气怎么样？')
const chatSending = ref(false)
const lastError = ref(null)
const lastErrorCode = ref(null)
const hello = ref(null)
const chatRunId = ref(null)
const chatStream = ref('')
const chatStreamStartedAt = ref(null)

connectGateway()

function connectGateway() {
  const previousClient = client

  const currClient = new ChatClient({
    url: SETTINGS.gatewayUrl,
    token: SETTINGS.token,
    password: SETTINGS.password,
    clientName: 'openclaw-control-ui',
    mode: 'webchat',
    instanceId: generateUUID(),
    onHello(helloRes) {
      if (client !== currClient) return
      console.warn('onHello:', helloRes, new Date())
      connected.value = true
      lastError.value = null
      lastErrorCode.value = null
      hello.value = helloRes
      chatRunId.value = null
    },
    onClose() {
      console.log('onClose:', arguments)
    },
    onEvent(evt) {
      if (client !== currClient) return
      handleGatewayEventUnsafe(evt)
    },
  })

  client = currClient
  previousClient?.stop()
  client.start()
}

function handleGatewayEventUnsafe(evt) {
  if (evt.event === 'chat') {
    handleChatEvent(evt.payload)
    return
  }
}

function handleChatEvent(payload) {
  console.log('handleChatEvent>payload:', payload)
  if (!payload) {
    return null
  }

  if (payload.state === 'delta') {
    payload.message.content?.forEach(({ type, text }) => {
      if (type === 'text' && !isSilentReplyStream(text)) {
        chatStream.value = text
      } else {
        console.warn('handleChatEvent>payload>type !== "text":', payload.message)
      }
    })
  } else if (payload.state === 'final') {
    chatMessages.push(payload.message)
  }
}

async function handleSendChat() {
  if (!connected.value) return
  await sendChatMessageNow(chatMessage.value)
}

async function sendChatMessageNow(message) {
  const runId = await sendChatMessage(message)
  const ok = Boolean(runId)
  return ok
}

async function sendChatMessage(message, attachments) {
  if (!client || !connected.value) {
    return null
  }
  const msg = message.trim()
  const hasAttachments = attachments?.length > 0
  if (!msg && !hasAttachments) {
    return null
  }

  const now = Date.now()
  const contentBlocks = []
  const runId = generateUUID()

  if (msg) {
    contentBlocks.push({ type: 'text', text: msg })
  }

  chatMessages.push({
    role: 'user',
    content: contentBlocks,
    timestamp: now,
  })

  chatSending.value = true
  chatRunId.value = runId
  chatStreamStartedAt.value = now

  try {
    await client.request('chat.send', {
      sessionKey: 'agent:main:main',
      message: msg,
      deliver: false,
      idempotencyKey: runId,
    })
    return runId
  } catch (err) {
    chatMessages.push({
      role: 'assistant',
      content: [{ type: 'text', text: `Error: ${JSON.stringify(err)}`, timestamp: Date.now() }],
    })
    return null
  } finally {
    chatSending.value = false
  }
}
</script>

<template>
  <div class="chat-page h-full flex flex-col">
    <h1>Chat page.</h1>
    <ul class="chat-messages">
      <li v-for="msg of chatMessages" :key="msg.timestamp">{{ JSON.stringify(msg, null, 2) }}</li>
    </ul>
    <hr />
    <div>{{ chatStream }}</div>
    <hr />
    <div class="mt-a">
      <n-input v-model:value="chatMessage" type="textarea" />
      <n-button @click="handleSendChat">Send</n-button>
    </div>
  </div>
</template>
