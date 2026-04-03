<script setup>
import SvgIcon from '@/components/SvgIcon/index.vue'

defineOptions({ name: 'ChatMessage' })

/**
 * @type {ChatMessage[]}
 */
const { messages } = defineProps({
  messages: Array,
})
console.log('messages:', messages)
</script>

<template>
  <div class="chat-messages-container h-full overflow-y-auto">
    <ul>
      <li v-for="msg of messages" :key="msg.id">
        <div class="chat-question flex justify-end gap-x-4 mb-4 ml-1 mr-4">
          <div class="chat-question_group flex flex-col gap-y-2">
            <div class="chat-question_text px-4 py-2">{{ msg.question.content }}</div>

            <div class="chat-question_role text-right text-[12px] font-300">
              <b>You</b>&emsp;<time>{{ msg.question.timeString }}</time>
            </div>
          </div>

          <div class="chat-avatar mt-auto mb-1 size-[36px] border flex-center">
            <SvgIcon icon="i-mdi:user" class="text-6" />
          </div>
        </div>

        <div class="chat-answer flex gap-x-4 mb-4 ml-1 mr-4">
          <div class="chat-avatar size-[36px] border flex-center">
            <SvgIcon icon="i-mdi:star" class="text-6" />
          </div>

          <div class="chat-answer_group flex flex-col gap-y-2">
            <div class="chat-answer_text px-2 py-2">
              <div v-if="msg._pending" class="chat-reading-indicator">
                <span class="chat-reading-indicator__dots"> <span></span><span></span><span></span> </span>
              </div>
              <div v-else class="chat-markdown px-2">
                {{ msg.answer.content }}
              </div>
            </div>
            <div v-if="!msg._pending" class="chat-answer_role text-[12px] font-300">
              <b>Claw</b>&emsp;<time>{{ msg.answer.timeString }}</time>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.chat-question {
  .chat-question_group {
    max-width: min(1000px, 70%);

    .chat-question_text {
      border-radius: var(--radius-lg);
      border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
      background-color: var(--accent-subtle);
    }
  }

  .chat-avatar {
    background-color: var(--accent-subtle);
    color: var(--accent);
    border-radius: var(--radius-md);
    border: 1px solid var(--accent);
  }
}

.chat-answer {
  .chat-avatar {
    background-color: var(--sider-width);
    color: var(--muted);
    border-color: var(--border);
    border-radius: var(--radius-md);
  }

  .chat-answer_group {
    max-width: min(1000px, 70%);
    .chat-answer_text {
      background-color: var(--bg);
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      box-shadow: inset 0 1px 0 var(--card-highlight);
    }
  }
}

/* Reading indicator */
.chat-reading-indicator {
  width: fit-content;
  .chat-reading-indicator__dots {
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
