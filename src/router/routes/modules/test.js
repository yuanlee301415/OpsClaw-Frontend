import { Layout } from '@/router/constants.js'

export const testRoutes = {
  path: '/test',
  name: 'Test',
  component: Layout,
  children: [
    {
      path: 'countdown',
      name: 'TestCountdown',
      meta: {
        title: '倒计时',
      },
      component: () => import('@/views/test/countdown.vue'),
    },
  ],
}
