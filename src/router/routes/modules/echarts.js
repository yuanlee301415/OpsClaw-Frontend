import { Layout } from '@/router/constants.js'

export const echartsRoutes = {
  path: '/echarts',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/echarts/index.vue'),
    },
    {
      path: 'test',
      component: () => import('@/views/echarts/test.vue'),
    },
  ],
}
