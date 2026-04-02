/*
 * 用户 Store
 * */

import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { StoreId, Role } from '@/enum/index.js'
import { useRouteStore } from '@/stores/index.js'
import { AuthUser } from '@/models/AuthUser.js'
import { setAuthToken, removeAuthToken, getAuthToken } from '@/utils/authToken.js'

export const useAuthStore = defineStore(StoreId.Auth, () => {
  const user = reactive(
    new AuthUser({
      name: '',
      roles: null,
    }),
  )

  const authStore = useAuthStore()
  const routeStore = useRouteStore()

  async function login({ userName }) {
    // const res = await loginApi(login)
    user.name = userName
    setAuthToken(userName)
    routeStore.resetRoutes()
  }

  async function logout() {
    removeAuthToken()
    resetStore()
    routeStore.toLogin()
  }

  async function getAuthUser() {
    // Object.assign(user, new AuthUser(await getAuthUserApi(token)))
    Object.assign(user, {
      name: getAuthToken(),
      roles: [Role.Admin],
    })
    console.log('getAuthUser>user:', user)
    return user
  }

  function resetStore() {
    authStore.$reset()
  }

  return {
    user,
    login,
    logout,
    getAuthUser,
    resetStore,
  }
})
