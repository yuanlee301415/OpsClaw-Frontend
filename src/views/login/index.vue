<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore, useRouteStore } from '@/stores/index.js'
import { noSideSpace } from '@/utils/naiveUI.js'

defineOptions({ name: 'LoginPage' })

const authStore = useAuthStore()
const routeStore = useRouteStore()

const rules = {
  wsUrl: {
    required: true,
  },
  token: {
    required: true,
  },
}

const formData = reactive({
  wsUrl: 'ws://127.0.0.1:18789',
  token: '388732ba5130f27a0fe4c6fcbb8908d3372b34a6b75025eb',
})

const loading = ref(false)
const formRef = ref(null)

async function handleSubmit() {
  await formRef.value?.validate()
  loading.value = true
  await authStore.login(formData)
  routeStore.redirectFormLogin()
}
</script>

<template>
  <div class="w-full h-full flex-center">
    <n-card class="w-auto p-20px">
      <div class="min-w-600px">
        <n-flex vertical class="flex-center">
          <img src="/favicon.svg" width="48" alt="Favicon" />
          <h1 class="font-bold">OpsClaw</h1>
        </n-flex>

        <n-form ref="formRef" :model="formData" :rules="rules" size="large" class="mt-10" @keyup.enter="handleSubmit">
          <n-form-item label="WebSocket URL" path="wsUrl">
            <n-input v-model:value="formData.wsUrl" :allow-input="noSideSpace" maxlength="100" />
          </n-form-item>

          <n-form-item label="网关令牌" path="token">
            <n-input v-model:value="formData.token" :allow-input="noSideSpace" show-password-on="click" type="password" maxlength="48" />
          </n-form-item>
        </n-form>

        <n-button :loading="loading" type="error" round block @click="handleSubmit"> 连接 </n-button>
      </div>
    </n-card>
  </div>
</template>
