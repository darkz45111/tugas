<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const formErrors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validateForm = (): boolean => {
  let isValid = true
  
  // Reset errors
  formErrors.name = ''
  formErrors.email = ''
  formErrors.password = ''
  formErrors.confirmPassword = ''
  
  // Validate name
  if (!formData.name) {
    formErrors.name = 'Name is required'
    isValid = false
  } else if (formData.name.length < 2) {
    formErrors.name = 'Name must be at least 2 characters'
    isValid = false
  }
  
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
  
  // Validate password confirmation
  if (!formData.confirmPassword) {
    formErrors.confirmPassword = 'Please confirm your password'
    isValid = false
  } else if (formData.password !== formData.confirmPassword) {
    formErrors.confirmPassword = 'Passwords do not match'
    isValid = false
  }
  
  return isValid
}

const handleRegister = async () => {
  if (!validateForm()) return
  
  const success = await authStore.register({
    name: formData.name,
    email: formData.email,
    password: formData.password
  })
  
  if (success) {
    router.push('/')
  }
}
</script>

<template>
  <div class="w-full max-w-md p-8 rounded-xl bg-dark-200/90 shadow-2xl">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold mb-2">
        <span class="text-primary-400">Vue</span><span class="text-white">Flix</span>
      </h1>
      <p class="text-gray-400">Create your account</p>
    </div>
    
    <form @submit.prevent="handleRegister" class="space-y-6">
      <!-- Error alert -->
      <div v-if="authStore.error" class="p-4 bg-red-500/20 border border-red-600 rounded-lg text-white text-sm">
        {{ authStore.error }}
      </div>
      
      <!-- Name field -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-300 mb-1">
          Full Name
        </label>
        <input
          v-model="formData.name"
          type="text"
          id="name"
          class="input"
          :class="{ 'border-red-500 focus:ring-red-500': formErrors.name }"
          placeholder="John Doe"
        />
        <p v-if="formErrors.name" class="mt-1 text-sm text-red-500">
          {{ formErrors.name }}
        </p>
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
      
      <!-- Confirm Password field -->
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-1">
          Confirm Password
        </label>
        <input
          v-model="formData.confirmPassword"
          type="password"
          id="confirmPassword"
          class="input"
          :class="{ 'border-red-500 focus:ring-red-500': formErrors.confirmPassword }"
          placeholder="••••••••"
        />
        <p v-if="formErrors.confirmPassword" class="mt-1 text-sm text-red-500">
          {{ formErrors.confirmPassword }}
        </p>
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
        {{ authStore.isLoading ? 'Creating account...' : 'Create Account' }}
      </button>
      
      <!-- Login link -->
      <div class="text-center pt-4 text-sm text-gray-400">
        Already have an account?
        <router-link to="/login" class="text-primary-400 hover:text-primary-300">
          Sign in
        </router-link>
      </div>
    </form>
  </div>
</template>