/*
 * 用户权限
 * */

import { useAuthStore, useRouteStore } from '@/stores/index.js'
import { LOGIN_ROUTE_NAME } from '@/router/constants.js'
import { basicRoutes } from '@/router/routes/basic.js'
import { getAuthToken } from '@/utils/authToken.js'

export function createPermissionGuard(router) {
  const routeStore = useRouteStore()

  router.beforeEach(async (to) => {
    // console.log('permission>to:\n', JSON.stringify({ path: to.path, name: to.name, meta: to.meta, params: to.params }, null, 2))

    // 页面无权限限制
    if (basicRoutes.some((_) => to.path.startsWith(_.path))) {
      // console.warn('页面无权限限制:', to.path)
      return true
    }

    const token = getAuthToken()
    const authStore = useAuthStore()

    // 未登录
    if (!token) {
      // console.warn('未登录')
      return { name: LOGIN_ROUTE_NAME, query: { redirect: to.path } }
    }

    if (authStore.user.name) {
      // console.warn('已授权')
      return true
    }

    console.warn('未授权')
    try {
      await authStore.getAuthUser()
      routeStore.addDynamicRoutes(authStore.user.roles)
      return { ...to, replace: true }
    } catch (e) {
      console.error('[router.beforeEach]::\n', e)
      // await authStore.logout()
      return false
    }
  })
}
