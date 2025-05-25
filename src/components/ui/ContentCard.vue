<script setup lang="ts">
import type { ContentItem } from '../../types/content'
import { useContentStore } from '../../stores/content'
import { computed } from 'vue'

const props = defineProps<{
  item: ContentItem
  size?: 'small' | 'medium' | 'large'
}>()

const contentStore = useContentStore()

const isInWatchlist = computed(() => {
  return contentStore.isInWatchlist(props.item)
})

const toggleWatchlist = () => {
  contentStore.toggleWatchlist(props.item)
}

const cardClass = computed(() => {
  switch(props.size) {
    case 'small':
      return 'w-36 sm:w-40'
    case 'large':
      return 'w-60 sm:w-72'
    case 'medium':
    default:
      return 'w-48 sm:w-56'
  }
})

const releaseYear = computed(() => {
  return new Date(props.item.releaseDate).getFullYear()
})

const contentRoute = computed(() => {
  return props.item.type === 'movie' 
    ? `/movie/${props.item.id}` 
    : `/series/${props.item.id}`
})
</script>

<template>
  <div :class="['card relative group', cardClass]">
    <!-- Poster image -->
    <router-link :to="contentRoute">
      <div class="aspect-[2/3] overflow-hidden rounded-lg">
        <img 
          :src="item.poster" 
          :alt="item.title"
          class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        <!-- Rating badge -->
        <div class="absolute top-2 right-2 bg-dark-300/90 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {{ item.rating.toFixed(1) }}
        </div>
        
        <!-- Content type badge -->
        <div class="absolute top-2 left-2 bg-primary-600/90 text-white px-2 py-1 rounded-md text-xs font-bold uppercase">
          {{ item.type }}
        </div>
        
        <!-- Hover overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-dark-300/90 via-dark-300/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          <div class="text-white text-center w-full">
            <router-link :to="`/watch/${item.type}/${item.id}`" class="btn-primary text-sm w-full mb-2 inline-block">
              Watch Now
            </router-link>
            <button @click="toggleWatchlist" class="btn text-sm w-full bg-dark-100/80 hover:bg-dark-100 text-white">
              <span v-if="isInWatchlist">Remove from List</span>
              <span v-else>Add to My List</span>
            </button>
          </div>
        </div>
      </div>
    </router-link>
    
    <!-- Content info -->
    <div class="p-2">
      <router-link :to="contentRoute" class="block">
        <h3 class="font-semibold text-white truncate">{{ item.title }}</h3>
        <div class="flex items-center text-xs text-gray-400 mt-1">
          <span>{{ releaseYear }}</span>
          <span class="mx-1">•</span>
          <span>{{ item.type === 'movie' ? `${item.duration} min` : `${item.totalEpisodes} episodes` }}</span>
        </div>
      </router-link>
    </div>
  </div>
</template>