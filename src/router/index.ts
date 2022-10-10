import { supabase } from '@/supabase'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/Home.vue'),
    },
    {
      path: '/auth',
      name: 'Auth',
      meta: { auth: true },
      component: () => import('../pages/Auth.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.matched.some((record) => !record.meta.auth)
  const token = JSON.parse(localStorage.getItem('supabase.auth.token') || '{}')
    ?.currentSession?.access_token
  const { error } = await supabase.auth.api.getUser(token)
  if (requireAuth && error) {
    next('/auth')
  } else {
    next()
  }
})

export default router
