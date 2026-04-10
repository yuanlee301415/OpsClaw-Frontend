<script setup>
import { useTemplateRef, nextTick } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
import Markdown from '@/components/Markdown/index.js'
import { Message } from '@/models/ChatMessage.js'

defineOptions({ name: 'ChatMessage' })

/**
 * @type {ChatMessage[]}
 */
const { messages } = defineProps({
  messages: Array,
})
console.log('messages:', messages)

const chatMessagesBoxBottomRef = useTemplateRef('chatMessagesBoxBottomRef')

function scrollIntoView() {
  nextTick(() => {
    chatMessagesBoxBottomRef.value?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  })
}

defineExpose({
  scrollIntoView,
})
</script>

<template>
  <div class="chat-messages-container h-full overflow-y-auto">
    <template v-for="message of messages" :key="message.id">
      <div class="chat-group chat-user">
        <div class="chat-avatar chat-user">
          <SvgIcon icon="i-mdi:user" class="text-6" />
        </div>

        <div class="chat-group-messages">
          <div v-for="content of message.question.contents" :key="content.key" class="chat-bubble fade-in">
            <div class="chat-text">{{ content.text }}</div>
          </div>

          <div class="chat-group-footer">
            <span class="chat-sender-name">You</span>
            <time class="chat-sender-time">{{ message.question.timeString }}</time>
            <span class="chat-delete"></span>
          </div>
        </div>
      </div>

      <template v-for="answer of message.answers" :key="answer.key">
        <div v-if="answer.role === Message.ROLE_ASSISTANT" class="chat-group chat-assistant">
          <div class="chat-avatar chat-assistant">
            <SvgIcon icon="i-mdi:star" class="text-6" />
          </div>

          <div class="chat-group-messages">
            <div v-for="content of answer.contents" :key="content.key" class="chat-bubble fade-in">
              <div class="chat-text">
                <Markdown :text="content.text" />
              </div>
            </div>

            <div class="chat-group-footer">
              <span class="chat-sender-name">Claw</span>
              <time class="chat-sender-time">{{ answer.timeString }}</time>
              <span class="chat-delete"></span>
            </div>
          </div>
        </div>

        <div v-else-if="answer.role === Message.ROLE_TOOL" class="chat-group chat-tool">
          <div class="chat-avatar chat-tool">
            <SvgIcon icon="i-mdi:settings" class="text-6" />
          </div>

          <div class="chat-group-messages">
            <div v-for="content of answer.contents" :key="content.key" class="chat-bubble fade-in">
              <details class="chat-tool-msg-collapse">
                <summary class="chat-tool-msg-summary">
                  <SvgIcon local-icon="zap" class="chat-tool-msg-summary__icon" />
                  <span class="chat-tool-msg-summary__label">Tool</span>
                  <span class="chat-tool-msg-summary__names">exec</span>
                </summary>
                <div class="chat-tool-msg-body">
                  <div class="chat-text">
                    <Markdown :text="content.text" />
                  </div>
                </div>
              </details>
            </div>

            <div class="chat-group-footer">
              <span class="chat-sender-name">Tool</span>
              <time class="chat-sender-time">{{ answer.timeString }}</time>
              <span class="chat-delete"></span>
            </div>
          </div>
        </div>
      </template>

      <div v-if="message._progress" class="chat-group chat-assistant">
        <div class="chat-avatar chat-assistant">
          <SvgIcon icon="i-mdi:star" class="text-6" />
        </div>

        <div class="chat-group-messages">
          <div class="chat-bubble chat-reading-indicator">
            <span class="chat-reading-indicator__dots"> <span></span><span></span><span></span> </span>
          </div>
        </div>
      </div>
    </template>

    <div ref="chatMessagesBoxBottomRef"></div>
  </div>
</template>

<style scoped lang="less">
@import 'style.less';
</style>
