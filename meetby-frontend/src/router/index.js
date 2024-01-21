import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '@/stores/auth.js'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
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
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _) => {
  const store = useAuthStore()
  if (to.meta.requiresAuth && !store.isLoggedIn) {
    return { name: "login" }
  } else if (to.name != "not-found" && !to.meta.requiresAuth && store.isLoggedIn) {
    // TODO: return route of my meets
  }
})

export default router