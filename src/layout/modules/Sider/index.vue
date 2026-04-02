<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSvgIcon } from '@/hooks/index.js'
import { router } from '@/router/index.js'
import { useRouteStore, useAppStore } from '@/stores/index.js'

defineOptions({ name: 'LayoutSider' })

const routeStore = useRouteStore()
const route = useRoute()
const { SvgIconVNode } = useSvgIcon()
const appStore = useAppStore()

// 生成菜单选项
function genMenuOptions(menus, options = []) {
  for (const _ of menus) {
    const option = {
      key: _.path,
      label: _.title,
      icon: _.icon && SvgIconVNode({ icon: _.icon }),
    }
    if (_.children?.length) {
      option.children = genMenuOptions(_.children)
    }
    options.push(option)
  }
  return options
}

// 菜单选项
const menuOptions = computed(() => genMenuOptions(routeStore.menus))

// 当前选中菜单
const activeKey = computed(() => route.path)

function handleClickMenu(path) {
  router.push({ path })
}
</script>

<template>
  <aside :class="{ collapsed: appStore.siderCollapsed }" class="transition-all-300">
    <n-menu
      :value="activeKey"
      :options="menuOptions"
      :collapsed="appStore.siderCollapsed"
      :collapsed-width="60"
      :collapsed-icon-size="30"
      @update:value="handleClickMenu"
    />
  </aside>
</template>

<style scoped lang="less">
aside {
  width: calc(var(--sider-width) - 10px);
  background-color: color-mix(in srgb, var(--panel) 98%, white 2%);
  border-right: 1px solid color-mix(in srgb, var(--border) 74%, transparent);
  &.collapsed {
    width: 60px;
  }
}
</style>
