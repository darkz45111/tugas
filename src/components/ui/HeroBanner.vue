<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { ContentItem } from '../../types/content'
import { useContentStore } from '../../stores/content'

const props = defineProps<{
  item: ContentItem
}>()

const router = useRouter()
const contentStore = useContentStore()

const isInWatchlist = computed(() => {
  return contentStore.isInWatchlist(props.item)
})

const toggleWatchlist = () => {
  contentStore.toggleWatchlist(props.item)
}

const watchNow = () => {
  router.push(`/watch/${props.item.type}/${props.item.id}`)
}

const moreInfo = () => {
  router.push(`/${props.item.type}/${props.item.id}`)
}
</script>

<template>
  <div 
    class="hero-banner relative h-[70vh] min-h-[500px] w-full bg-cover bg-center"
    :style="`background-image: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.3)), url(${item.backdrop})`"
  >
    <div class="absolute inset-0 flex items-center">
      <div class="container-custom">
        <div class="max-w-2xl animate-fade-in">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-3">{{ item.title }}</h1>
          
          <div class="flex items-center text-sm md:text-base text-gray-300 mb-4">
            <span>{{ new Date(item.releaseDate).getFullYear() }}</span>
            <span class="mx-2">•</span>
            <span>{{ item.type === 'movie' ? `${item.duration} min` : `${item.totalEpisodes} episodes` }}</span>
            <span class="mx-2">•</span>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {{ item.rating.toFixed(1) }}
            </div>
          </div>
          
          <!-- Genres Pills -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span 
              v-for="genre in item.genres" 
              :key="genre"
              class="px-3 py-1 bg-dark-100/50 text-white text-xs rounded-full"
            >
              {{ genre }}
            </span>
          </div>
          
          <p class="text-gray-300 mb-8 line-clamp-3 md:line-clamp-none">{{ item.description }}</p>
          
          <div class="flex flex-wrap gap-4">
            <button @click="watchNow" class="btn-primary flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
              </svg>
              Watch Now
            </button>
            <button @click="toggleWatchlist" class="btn bg-dark-100/70 hover:bg-dark-100 text-white flex items-center">
              <svg v-if="isInWatchlist" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {{ isInWatchlist ? 'In My List' : 'Add to My List' }}
            </button>
            <button @click="moreInfo" class="btn bg-dark-100/70 hover:bg-dark-100 text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>