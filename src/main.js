import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Import routes
import routes from './router'

// Import auth store
import { useAuthStore } from './stores/auth'

// Create Pinia store
const pinia = createPinia()

// Create Router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// Auth Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isLoginPage = to.path === '/login' || to.path === '/register'

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (isLoginPage && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

// Mount app
createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')
