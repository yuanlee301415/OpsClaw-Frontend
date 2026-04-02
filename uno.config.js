import { defineConfig, presetWind3 } from 'unocss'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  // 扫描范围
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist'],
    },
  },

  presets: [
    presetWind3(),

    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],

  // 安全列表，确保动态图标被扫描
  safelist: [
    'i-mdi:home-outline',
    'i-mdi:account-outline',
    'i-mdi:information-slab-circle-outline',
    'i-mdi:alpha-n-box-outline',
    'i-mdi:reorder-horizontal',
    'i-mdi:timer-sand-complete',
    'i-mdi:cog-outline',
    'i-mdi:grid-large',
    'i-mdi:block-helper',
    'i-mdi:chat-bubble-outline',
  ],

  // 快捷方式
  shortcuts: [
    { 'size-full': 'w-full h-full' },
    {
      'flex-center': 'flex justify-center items-center',
      'flex-x-center': 'flex justify-center',
      'flex-y-center': 'flex items-center',
      'flex-col': 'flex flex-col',
      'flex-col-center': 'flex-center flex-col',
      'flex-row': 'flex flex-row',
      'flex-row-center': 'flex-center flex-row',
    },
    {
      'fixed-center': 'fixed left-0 top-0 flex-center size-full',
    },
    {
      'nowrap-hidden': 'overflow-hidden whitespace-nowrap',
      'ellipsis-text': 'nowrap-hidden text-ellipsis',
    },
  ],
})
