<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="flex items-center justify-center min-h-[70vh] p-8">
    <div class="text-center max-w-lg">
      <div class="mb-8 relative">
        <div class="text-9xl font-bold text-primary-600 opacity-20 select-none">404</div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      
      <h1 class="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
      <p class="text-gray-400 mb-8 text-lg">
        The content you're looking for doesn't exist or has been moved.
      </p>
      
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <button @click="goBack" class="btn-primary">
          Go Back
        </button>
        <button @click="goHome" class="btn bg-dark-100 hover:bg-dark-100/80 text-white">
          Return to Home
        </button>
      </div>
    </div>
  </div>
</template>