import { Layout, NOT_FOUND_ROUTE_NAME, NOT_FOUND_PAGE, HOME_ROUTE_NAME } from '@/router/constants.js'
import { basicRoutes } from '@/router/routes/basic.js'
import { testRoutes } from '@/router/routes/modules/test.js'
import { echartsRoutes } from '@/router/routes/modules/echarts.js'

/*
 * 静态路由
 * - 所有角色公共路由
 * */
export const staticRoutes = [
  {
    path: '/',
    redirect: '/chat',
    name: HOME_ROUTE_NAME,
  },

  {
    path: '/chat',
    name: 'Chat',
    meta: { title: '聊天', icon: 'i-mdi:chat-bubble-outline' },
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/chat/index.vue'),
      },
    ],
  },

  {
    path: '/claw',
    name: 'Claw',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/claw/index.vue'),
      },
    ],
  },

  ...basicRoutes,

  testRoutes,

  echartsRoutes,
]

/*
 * 动态路由
 * - 有权限限制，根据用户角色动态添加
 * */
export const dynamicRoutes = [
  // VueRouter 库限制，必须放置在所有路由后面
  {
    path: '/:pathMatch(.*)*',
    name: NOT_FOUND_ROUTE_NAME,
    component: NOT_FOUND_PAGE,
  },
]
