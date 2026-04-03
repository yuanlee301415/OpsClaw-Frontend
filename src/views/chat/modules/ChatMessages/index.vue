<script setup>
import SvgIcon from '@/components/SvgIcon/index.vue'

defineOptions({ name: 'ChatMessage' })

defineProps({
  messages: Array,
})
</script>

<template>
  <div class="chat-messages-container h-full overflow-y-auto">
    <ul>
      <li v-for="msg of messages" :key="msg.id">
        <div class="chat-question flex justify-end gap-x-4 mb-4 ml-1 mr-4">
          <div class="chat-question_group flex flex-col gap-y-4">
            <div class="chat-question_text p-4">{{ msg.question }}</div>

            <div class="chat-question_role text-right text-[12px] font-300"><b>You</b>&emsp;<time>12:55</time></div>
          </div>

          <div class="chat-avatar mt-auto mb-1 size-[36px] border flex-center">
            <SvgIcon icon="i-mdi:user" class="text-6" />
          </div>
        </div>

        <div class="chat-answer flex gap-x-4 mb-4 ml-1 mr-4">
          <div class="chat-avatar size-[36px] border flex-center">
            <SvgIcon icon="i-mdi:star" class="text-6" />
          </div>

          <div class="chat-answer_group flex flex-col gap-y-4">
            <div v-if="msg._pending" class="chat-reading-indicator">
              <span class="chat-reading-indicator__dots"> <span></span><span></span><span></span> </span>
            </div>

            <template v-else>
              <div class="chat-answer_text p-4">{{ msg.answer }}</div>
              <div class="chat-answer_role text-[12px] font-300"><b>Claw</b>&emsp;<time>17:01</time></div>
            </template>
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
    border-color: color-mix(in srgb, var(--accent) 20%, transparent);
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
      border: 1px solid color-mix(in srgb, var(--border) 20%, transparent);
      box-shadow: inset 0 1px 0 var(--card-highlight);
    }
  }
}

/* Reading indicator */
.chat-reading-indicator {
  width: fit-content;
  padding: 10px 16px;
}

.chat-reading-indicator__dots {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 12px;
}

.chat-reading-indicator__dots > span {
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

.chat-reading-indicator__dots > span:nth-child(2) {
  animation-delay: 0.15s;
}

.chat-reading-indicator__dots > span:nth-child(3) {
  animation-delay: 0.3s;
}

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
</style>
