<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useContentStore } from '../../stores/content'

const router = useRouter()
const authStore = useAuthStore()
const contentStore = useContentStore()

const isScrolled = ref(false)
const showUserMenu = ref(false)
const searchInput = ref('')
const showSearch = ref(false)

// Track scroll position for transparent/solid header
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Delayed dropdown for user menu
const openUserMenu = async () => {
  // Simulate 1.5s delay before showing the menu
  setTimeout(() => {
    showUserMenu.value = true
  }, 1500)
}

const closeUserMenu = () => {
  showUserMenu.value = false
}

const logout = () => {
  authStore.logout()
  router.push('/login')
  closeUserMenu()
}

const goToProfile = () => {
  router.push('/profile')
  closeUserMenu()
}

const performSearch = () => {
  if (searchInput.value.trim()) {
    contentStore.searchQuery = searchInput.value
    contentStore.searchContent()
    router.push('/search')
    // Reset and hide search on mobile
    searchInput.value = ''
    showSearch.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Check initial position
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header 
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="[isScrolled ? 'bg-dark-200 shadow-md py-3' : 'bg-gradient-to-b from-dark-300 to-transparent py-5']"
  >
    <div class="container-custom flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center">
        <span class="text-primary-400 font-bold text-2xl mr-1">Vue</span>
        <span class="text-white font-bold text-2xl">Flix</span>
      </router-link>
      
      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-6">
        <router-link 
          to="/" 
          class="text-white hover:text-primary-400 transition-colors duration-200"
          active-class="text-primary-400"
        >
          Home
        </router-link>
        <router-link 
          to="/search" 
          class="text-white hover:text-primary-400 transition-colors duration-200"
          active-class="text-primary-400"
        >
          Discover
        </router-link>
        <router-link 
          to="/watchlist" 
          class="text-white hover:text-primary-400 transition-colors duration-200"
          active-class="text-primary-400"
        >
          My List
        </router-link>
      </nav>
      
      <!-- Search and User Menu -->
      <div class="flex items-center">
        <!-- Desktop Search -->
        <div class="hidden md:flex items-center relative mr-4">
          <input
            v-model="searchInput"
            @keyup.enter="performSearch"
            type="text"
            placeholder="Search titles..."
            class="bg-dark-100 text-white pl-10 pr-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
          <button 
            @click="performSearch"
            class="absolute left-3 text-gray-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        
        <!-- Mobile Search Toggle -->
        <button 
          @click="showSearch = !showSearch" 
          class="md:hidden p-2 text-white mr-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        
        <!-- User Menu -->
        <div class="relative">
          <button 
            @click="openUserMenu"
            class="flex items-center focus:outline-none"
          >
            <img 
              :src="authStore.user?.avatar" 
              alt="User avatar"
              class="h-9 w-9 rounded-full object-cover border-2 border-primary-500"
            >
          </button>
          
          <div 
            v-if="showUserMenu"
            class="absolute right-0 mt-2 py-2 w-48 bg-dark-100 rounded-md shadow-xl z-50 animate-fade-in"
          >
            <div class="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
              Signed in as <span class="font-semibold">{{ authStore.user?.name }}</span>
            </div>
            <a 
              @click="goToProfile"
              class="block px-4 py-2 text-sm text-white hover:bg-primary-700 cursor-pointer"
            >
              View Profile
            </a>
            <a 
              @click="logout"
              class="block px-4 py-2 text-sm text-white hover:bg-primary-700 cursor-pointer"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mobile Search Bar -->
    <div 
      v-if="showSearch"
      class="absolute top-full left-0 w-full bg-dark-200 px-4 py-3 md:hidden animate-slide-up"
    >
      <div class="relative">
        <input
          v-model="searchInput"
          @keyup.enter="performSearch"
          type="text"
          placeholder="Search titles..."
          class="bg-dark-100 text-white pl-10 pr-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
          autofocus
        >
        <button 
          @click="performSearch"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  </header>
  
  <!-- Spacer for fixed header -->
  <div class="h-20"></div>
</template>