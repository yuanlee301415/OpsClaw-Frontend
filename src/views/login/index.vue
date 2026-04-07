<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore, useRouteStore } from '@/stores/index.js'
import { noSideSpace } from '@/utils/naiveUI.js'

defineOptions({ name: 'LoginPage' })

const NAME = import.meta.env.VITE_APP_TITLE
const authStore = useAuthStore()
const routeStore = useRouteStore()

const rules = {
  userName: {
    required: true,
  },
}

const formData = reactive({
  userName: '',
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
          <h1 class="font-bold">{{ NAME }}</h1>
        </n-flex>

        <n-form ref="formRef" :model="formData" :rules="rules" size="large" class="mt-10" @keyup.enter="handleSubmit">
          <n-form-item label="用户名" path="userName">
            <n-input v-model:value="formData.userName" :allow-input="noSideSpace" placeholder="随便填" maxlength="10" />
          </n-form-item>
        </n-form>

        <n-button :loading="loading" type="error" round block @click="handleSubmit">登录</n-button>
      </div>
    </n-card>
  </div>
</template>
