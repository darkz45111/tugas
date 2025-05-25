<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const formData = reactive({
  email: '',
  password: ''
})

const formErrors = reactive({
  email: '',
  password: ''
})

const validateForm = (): boolean => {
  let isValid = true
  
  // Reset errors
  formErrors.email = ''
  formErrors.password = ''
  
  // Validate email
  if (!formData.email) {
    formErrors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    formErrors.email = 'Please enter a valid email address'
    isValid = false
  }
  
  // Validate password
  if (!formData.password) {
    formErrors.password = 'Password is required'
    isValid = false
  } else if (formData.password.length < 6) {
    formErrors.password = 'Password must be at least 6 characters'
    isValid = false
  }
  
  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return
  
  const success = await authStore.login(formData)
  if (success) {
    router.push('/')
  }
}

// For demo purposes - pre-fill with test account
const fillTestAccount = () => {
  formData.email = 'user@example.com'
  formData.password = 'password'
}
</script>

<template>
  <div class="w-full max-w-md p-8 rounded-xl bg-dark-200/90 shadow-2xl">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-2">
        <span class="text-primary-400">Vue</span><span class="text-white">Flix</span>
      </h1>
      <p class="text-gray-400">Sign in to continue</p>
    </div>
    
    <form @submit.prevent="handleLogin" class="space-y-6">
      <!-- Error alert -->
      <div v-if="authStore.error" class="p-4 bg-red-500/20 border border-red-600 rounded-lg text-white text-sm">
        {{ authStore.error }}
      </div>
      
      <!-- Email field -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-300 mb-1">
          Email Address
        </label>
        <input
          v-model="formData.email"
          type="email"
          id="email"
          class="input"
          :class="{ 'border-red-500 focus:ring-red-500': formErrors.email }"
          placeholder="your@email.com"
        />
        <p v-if="formErrors.email" class="mt-1 text-sm text-red-500">
          {{ formErrors.email }}
        </p>
      </div>
      
      <!-- Password field -->
      <div>
        <label for="password" class="block text-sm font-medium text-gray-300 mb-1">
          Password
        </label>
        <input
          v-model="formData.password"
          type="password"
          id="password"
          class="input"
          :class="{ 'border-red-500 focus:ring-red-500': formErrors.password }"
          placeholder="••••••••"
        />
        <p v-if="formErrors.password" class="mt-1 text-sm text-red-500">
          {{ formErrors.password }}
        </p>
      </div>
      
      <!-- Forgot password link -->
      <div class="flex justify-end">
        <a href="#" class="text-sm text-primary-400 hover:text-primary-300">
          Forgot password?
        </a>
      </div>
      
      <!-- Submit button -->
      <button
        type="submit"
        class="btn-primary w-full flex justify-center items-center"
        :disabled="authStore.isLoading"
      >
        <svg
          v-if="authStore.isLoading"
          class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        {{ authStore.isLoading ? 'Signing in...' : 'Sign In' }}
      </button>
      
      <!-- Demo account helper -->
      <div class="text-center">
        <button
          type="button"
          @click="fillTestAccount"
          class="text-sm text-gray-400 hover:text-primary-400"
        >
          Use demo account
        </button>
      </div>
      
      <!-- Register link -->
      <div class="text-center pt-4 text-sm text-gray-400">
        Don't have an account?
        <router-link to="/register" class="text-primary-400 hover:text-primary-300">
          Sign up
        </router-link>
      </div>
    </form>
  </div>
</template>