import { Layout, NOT_FOUND_PAGE } from '@/router/constants.js'

export const exceptionRoutes = {
  path: '/exception',
  name: 'Exception',
  component: Layout,
  children: [
    {
      path: '404',
      name: 'Exception404',
      meta: {
        title: '404',
      },
      component: NOT_FOUND_PAGE,
    },
    {
      path: '403',
      name: 'Exception403',
      meta: {
        title: '403',
      },
      component: () => import('@/views/exception/403.vue'),
    },
  ],
}
