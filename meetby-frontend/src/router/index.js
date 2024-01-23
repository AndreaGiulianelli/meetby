import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '@/stores/auth.js'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import MeetsPage from '@/views/MeetsPage.vue'
import MeetDetailPage from '@/views/MeetDetailPage.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpPage
  },
  {
    path: '/meets',
    name: 'meets',
    component: MeetsPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/meets/:meetId',
    name: 'meetDetail',
    component: MeetDetailPage,
    meta: { requiresAuth: true },
  },
  { path: '/:pathMatch(.*)*', name: 'notound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const store = useAuthStore()
  if (to.meta.requiresAuth && !store.isLoggedIn) {
    return { name: "login" }
  } else if (to.name != "not-found" && !to.meta.requiresAuth && store.isLoggedIn) {
    return { name: "meets" }
  }
})

export default router