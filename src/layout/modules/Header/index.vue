<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore, useAppStore } from '@/stores/index.js'
import { LOGIN_ROUTE_NAME } from '@/router/constants.js'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useSvgIcon } from '@/hooks/index.js'
import Logo from '../Logo/index.vue'
import MenuToggler from '@/components/MenuToggler/index.vue'
import Breadcrumb from '../Breadcrumb/index.vue'

defineOptions({ name: 'LayoutHeader' })

const KEYS = {
  LOGOUT: 'logout',
}
const authStore = useAuthStore()
const router = useRouter()
const { SvgIconVNode } = useSvgIcon()
const appStore = useAppStore()

const options = [
  {
    label: '退出登录',
    key: KEYS.LOGOUT,
    icon: SvgIconVNode({ icon: 'i-mdi:exit-to-app', size: 18 }),
  },
]

function logout() {
  window.$dialog.info({
    title: '提示',
    content: '确定退出登录吗？',
    positiveText: '确认',
    negativeText: '取消',
    onPositiveClick() {
      authStore.logout()
    },
  })
}

function handleSelect(key) {
  console.log(key)
  switch (key) {
    case KEYS.LOGOUT:
      logout()
      break
  }
}
</script>

<template>
  <header class="flex items-center gap-4">
    <Logo />

    <MenuToggler :collapsed="appStore.siderCollapsed" @click="appStore.toggleSiderCollapsed()" />

    <Breadcrumb />

    <n-flex size="medium" class="ml-a">
      <template v-if="authStore.user.name">
        <n-dropdown :options="options" trigger="click" @select="handleSelect">
          <n-button>
            <template #icon>
              <SvgIcon icon="i-mdi:account-circle-outline" />
            </template>
            {{ authStore.user.name }}
          </n-button>
        </n-dropdown>
      </template>
      <n-button v-else text @click="router.push({ name: LOGIN_ROUTE_NAME })">[登录]</n-button>
    </n-flex>
  </header>
</template>

<style scoped lang="less">
header {
  height: 56px;
  padding: 0 24px;
  background: var(--bg-mix-82);
  border-bottom: 1px solid var(--border-mix-75);
}
</style>
