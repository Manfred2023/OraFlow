import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import MembersView from '@/views/MembersView.vue'
import ProgramView from '@/views/ProgramView.vue'

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
    {
      path: '/members',
      name: 'members',
      component: MembersView,
    },
    {
      path: '/program',
      name: 'program',
      component: ProgramView,
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
