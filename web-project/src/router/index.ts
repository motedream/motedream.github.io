// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../components/Home.vue'),
    meta: { title: '静态页面' }
  },
  {
    path: '/main',
    component: () => import('../components/Main.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/Entrance.vue')
      },
    ]
  }
  // 其他路由...
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  routes
})

export default router
