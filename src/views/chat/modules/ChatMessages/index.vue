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
          <div class="chat-bubble fade-in">
            <div class="chat-text">{{ message.question.content }}</div>
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
            <div class="chat-bubble fade-in">
              <div class="chat-text">
                <Markdown :text="answer.content" />
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
            <div class="chat-bubble fade-in">
              <div class="chat-text">
                {{ answer.content }}
              </div>
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
.chat-group {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-bottom: 14px;
  margin-left: 4px;
  margin-right: 16px;

  &.chat-user {
    flex-direction: row-reverse;
    justify-content: flex-start;
    .chat-group-messages {
      align-items: stretch;
      .chat-bubble {
        border-color: var(--accent-mix);
        background: var(--accent-subtle);
      }
      .chat-group-footer {
        justify-content: flex-end;
      }
    }
  }

  .chat-avatar {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-md);
    background: var(--panel-strong);
    display: grid;
    place-items: center;
    font-weight: 600;
    font-size: 13px;
    flex-shrink: 0;
    align-self: flex-end;
    margin-bottom: 4px;
    border: 1px solid var(--border);
    &.chat-user {
      background: var(--accent-subtle);
      color: var(--accent);
      border-color: var(--accent-mix);
    }
    &.chat-assistant {
      background: var(--secondary);
      color: var(--muted);
    }
    &.chat-tool {
      background: var(--secondary);
      color: var(--muted);
    }
  }

  .chat-group-messages {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1 1 auto;
    max-width: min(900px, 68%);

    .chat-bubble {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      word-wrap: break-word;
      position: relative;
      display: block;
      border-radius: var(--radius-lg);
      padding: 10px 14px;
      min-width: 0;
      border: 1px solid var(--border);
      background: var(--card);

      .chat-text {
        font-size: 14px;
        overflow-wrap: anywhere;
        word-break: break-word;
        color: var(--chat-text);
        line-height: 1.5;
      }
    }

    .chat-group-footer {
      display: flex;
      gap: 8px;
      align-items: baseline;
      margin-top: 6px;
      .chat-sender-name {
        font-weight: 500;
        font-size: 12px;
        color: var(--muted);
      }
      .chat-sender-time {
        font-size: 11px;
        color: var(--muted);
        opacity: 0.7;
      }
    }
  }
}

/* Reading indicator */
.chat-reading-indicator {
  @keyframes chatReadingDot {
    0%,
    80%,
    100% {
      opacity: 0.4;
      transform: translateY(0);
    }

    40% {
      opacity: 1;
      transform: translateY(-3px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .chat-reading-indicator__dots > span {
      animation: none;
      opacity: 0.6;
    }
  }
  width: fit-content !important;
  padding: 6px 8px !important;
  .chat-reading-indicator__dots {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    > span {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: var(--radius-full);
      background: var(--muted);
      opacity: 0.6;
      transform: translateY(0);
      animation: chatReadingDot 1.2s ease-in-out infinite;
      will-change: transform, opacity;
    }
    > span:nth-child(2) {
      animation-delay: 0.15s;
    }
    > span:nth-child(3) {
      animation-delay: 0.3s;
    }
  }
}
</style>
