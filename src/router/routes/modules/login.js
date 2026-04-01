import { LOGIN_ROUTE_NAME } from '@/router/constants.js'

export const loginRoutes = {
  path: '/login',
  component: () => import('@/views/login/index.vue'),
  name: LOGIN_ROUTE_NAME,
}
