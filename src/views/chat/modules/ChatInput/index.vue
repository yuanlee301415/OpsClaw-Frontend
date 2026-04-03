<script setup>
import SvgIcon from '@/components/SvgIcon/index.vue'

defineOptions({ name: 'ChatInput' })

const questionContent = defineModel('questionContent')
const emits = defineEmits(['send'])

function handleSend() {
  emits('send', questionContent.value)
}
</script>

<template>
  <div class="chat-input-container relative flex flex-col">
    <div class="chat-input_area">
      <textarea v-model="questionContent" rows="2" placeholder="请输入问题"></textarea>
    </div>
    <div class="chat-input_toolbar flex items-center justify-between">
      <div class="chat-input_toolbar-left">
        <n-button quaternary type="tertiary" size="small">
          <template #icon>
            <n-icon><SvgIcon local-icon="attach-solid" /></n-icon>
          </template>
        </n-button>
        <n-button quaternary type="tertiary" size="small">
          <template #icon>
            <n-icon><SvgIcon icon="i-mdi:keyboard-voice" /></n-icon>
          </template>
        </n-button>
      </div>

      <div class="chat-input_toolbar-right">
        <n-button quaternary type="tertiary" size="small">
          <template #icon>
            <n-icon><SvgIcon icon="i-mdi:plus" /></n-icon>
          </template>
        </n-button>
        <n-button quaternary type="tertiary" size="small">
          <template #icon>
            <n-icon><SvgIcon icon="i-mdi:tray-download" /></n-icon>
          </template>
        </n-button>
        <n-button quaternary type="tertiary" size="small" @click="handleSend">
          <template #icon>
            <n-icon><SvgIcon local-icon="send" /></n-icon>
          </template>
        </n-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.chat-input-container {
  border: 1px solid var(--border);
  background-color: var(--card);
  border-radius: var(--radius-lg);
  flex-shrink: 0;
  transition:
    border-color var(--duration-fast) ease,
    box-shadow var(--duration-fast) ease;
  &:focus-within {
    border-color: var(--border-strong);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--border-strong) 24%, transparent);
  }
  .chat-input_area {
    textarea {
      width: 100%;
      min-height: 40px;
      max-height: 160px;
      resize: none;
      padding: 10px 10px 8px;
      border: none;
      background: transparent;
      color: var(--text);
      font-size: 0.92rem;
      font-family: inherit;
      line-height: 1.4;
      outline: none;
    }
  }
  .chat-input_toolbar {
    padding: 6px 10px;
    border-top: 1px solid var(--border);
  }
}
</style>
