<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentStore } from '../stores/content'
import type { Movie, Series, Episode } from '../types/content'

const route = useRoute()
const router = useRouter()
const contentStore = useContentStore()

const content = ref<Movie | Series | null>(null)
const contentType = computed(() => route.params.type as 'movie' | 'series')
const selectedSeason = ref(Number(route.query.season) || 1)
const selectedEpisode = ref(Number(route.query.episode) || 1)
const isLoading = ref(true)
const isBuffering = ref(true)
const currentTime = ref(0)
const duration = ref(100)
const volume = ref(50)
const isPlaying = ref(false)
const isFullscreen = ref(false)
const showDescription = ref(false)

// Simulated progress timer
let progressTimer: number | null = null

// Get content details
onMounted(() => {
  const contentId = Number(route.params.id)
  const foundContent = contentStore.getContentById(contentId, contentType.value)
  
  if (!foundContent) {
    router.push('/404')
    return
  }
  
  content.value = foundContent
  
  // Simulate video loading
  setTimeout(() => {
    isLoading.value = false
    
    // Simulate buffering
    setTimeout(() => {
      isBuffering.value = false
      startPlaying()
    }, 2000)
  }, 1500)
})

// Clean up timer when component unmounts
onUnmounted(() => {
  if (progressTimer) {
    clearInterval(progressTimer)
  }
})

// Get current episode if series
const currentEpisode = computed((): Episode | null => {
  if (!content.value || content.value.type !== 'series') return null
  
  const series = content.value as Series
  const season = series.seasons.find(s => s.id === selectedSeason.value)
  
  if (!season) return null
  
  return season.episodes.find(e => e.episode === selectedEpisode.value) || null
})

// Get content title
const contentTitle = computed(() => {
  if (!content.value) return ''
  
  if (content.value.type === 'movie') {
    return content.value.title
  } else {
    if (currentEpisode.value) {
      return `${content.value.title} - ${currentEpisode.value.title}`
    }
    return content.value.title
  }
})

// Get content description
const contentDescription = computed(() => {
  if (!content.value) return ''
  
  if (content.value.type === 'movie') {
    return content.value.description
  } else if (currentEpisode.value) {
    return currentEpisode.value.description
  }
  return content.value.description
})

// Format time for display
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

// Handle play/pause
const togglePlay = () => {
  isPlaying.value = !isPlaying.value
  showDescription.value = !isPlaying.value
  
  if (isPlaying.value) {
    startPlaying()
  } else {
    if (progressTimer) {
      clearInterval(progressTimer)
      progressTimer = null
    }
  }
}

// Start playing and tracking progress
const startPlaying = () => {
  isPlaying.value = true
  showDescription.value = false
  
  // Set duration based on content type
  if (content.value?.type === 'movie') {
    duration.value = (content.value as Movie).duration * 60
  } else if (currentEpisode.value) {
    duration.value = currentEpisode.value.duration * 60
  }
  
  // Simulate progress
  if (progressTimer) clearInterval(progressTimer)
  
  progressTimer = setInterval(() => {
    if (currentTime.value < duration.value) {
      currentTime.value += 1
    } else {
      if (progressTimer) clearInterval(progressTimer)
    }
  }, 1000)
}

// Handle seeking
const seek = (event: MouseEvent) => {
  const progressBar = event.currentTarget as HTMLElement
  const rect = progressBar.getBoundingClientRect()
  const percent = (event.clientX - rect.left) / rect.width
  currentTime.value = percent * duration.value
}

// Toggle fullscreen
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

// Handle volume change
const changeVolume = (event: Event) => {
  const input = event.target as HTMLInputElement
  volume.value = Number(input.value)
}

// Go back
const goBack = () => {
  router.go(-1)
}

// Get content background
const contentBackground = computed(() => {
  if (!content.value) return ''
  
  if (content.value.type === 'movie') {
    return (content.value as Movie).backdrop
  } else if (currentEpisode.value) {
    return currentEpisode.value.thumbnail
  }
  
  return (content.value as Series).backdrop
})
</script>

<template>
  <div class="h-screen flex flex-col bg-black">
    <!-- Loading state -->
    <div 
      v-if="isLoading" 
      class="flex-1 flex items-center justify-center"
    >
      <div class="text-center">
        <div class="mb-4">
          <svg class="animate-spin h-12 w-12 text-primary-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p class="text-lg text-gray-300">Loading content...</p>
      </div>
    </div>
    
    <!-- Video Player -->
    <div 
      v-else
      class="relative flex-1 flex flex-col"
      :class="{ 'fixed inset-0 z-50 bg-black': isFullscreen }"
    >
      <!-- Video Container -->
      <div class="relative flex-1 overflow-hidden">
        <!-- Video Placeholder (with background image) -->
        <div 
          class="absolute inset-0 bg-cover bg-center"
          :style="`background-image: url(${contentBackground})`"
        ></div>
        
        <!-- Dark overlay -->
        <div class="absolute inset-0 bg-black/40"></div>
        
        <!-- Description Overlay -->
        <div 
          v-if="showDescription"
          class="absolute inset-0 bg-black/80 flex items-center justify-center p-8 z-40"
        >
          <div class="max-w-2xl text-center">
            <h2 class="text-2xl font-bold mb-4">{{ contentTitle }}</h2>
            <p class="text-gray-300">{{ contentDescription }}</p>
          </div>
        </div>
        
        <!-- Buffering Indicator -->
        <div 
          v-if="isBuffering" 
          class="absolute inset-0 flex items-center justify-center z-10"
        >
          <div class="bg-black/60 p-4 rounded-full">
            <svg class="animate-spin h-10 w-10 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
        
        <!-- Back Button (always visible) -->
        <button 
          @click="goBack"
          class="absolute top-4 left-4 z-30 text-white p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        
        <!-- Content Title Overlay -->
        <div class="absolute top-4 left-16 right-4 flex items-center z-30">
          <h1 class="text-white text-xl font-bold truncate">{{ contentTitle }}</h1>
        </div>
        
        <!-- Play/Pause Button (center) -->
        <button 
          v-if="!isBuffering"
          @click="togglePlay"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 text-white p-4 bg-primary-600/70 hover:bg-primary-600 rounded-full transition-colors"
        >
          <svg v-if="isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        
        <!-- Controls Overlay (bottom) -->
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-20 pb-4 px-4 z-20">
          <!-- Progress Bar -->
          <div 
            @click="seek"
            class="h-1 bg-gray-600 rounded-full mb-4 cursor-pointer group"
          >
            <div 
              class="h-full bg-primary-500 rounded-full relative"
              :style="`width: ${(currentTime / duration) * 100}%`"
            >
              <div class="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          
          <!-- Control Buttons -->
          <div class="flex items-center justify-between">
            <!-- Left Controls -->
            <div class="flex items-center space-x-4">
              <button 
                @click="togglePlay"
                class="text-white"
              >
                <svg v-if="isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              
              <!-- Volume Control -->
              <div class="flex items-center space-x-1">
                <button class="text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  v-model="volume"
                  @input="changeVolume"
                  class="w-20"
                />
              </div>
              
              <!-- Time Display -->
              <div class="text-white text-sm">
                {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
              </div>
            </div>
            
            <!-- Right Controls -->
            <div>
              <button 
                @click="toggleFullscreen"
                class="text-white"
              >
                <svg v-if="isFullscreen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>