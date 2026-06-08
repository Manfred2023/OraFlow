import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
    },
  ],
})
router.beforeEach((to, from, next) => {
  const authenticated = localStorage.getItem('authenticated')

  if (to.path === '/dashboard' && !authenticated) {
    next('/')
    return
  }

  next()
})

export default router
