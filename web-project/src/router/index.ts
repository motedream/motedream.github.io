// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
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

router.beforeEach((to, _, next) => {
  const url = new URL(window.location.href);
  const resolvedRoute = router.resolve(to);
  if(resolvedRoute.href === "#/"){
    window.location.href = `${url.origin}/web/index.html`;
  }

  next(); 
});

export default router
