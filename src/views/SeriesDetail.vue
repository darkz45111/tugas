<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContentStore } from '../stores/content'
import type { Series, Season, Episode } from '../types/content'

const route = useRoute()
const router = useRouter()
const contentStore = useContentStore()

const series = ref<Series | null>(null)
const selectedSeason = ref<Season | null>(null)
const isInWatchlist = computed(() => series.value ? contentStore.isInWatchlist(series.value) : false)
const loading = ref(true)
const showTrailer = ref(false)

onMounted(() => {
  const seriesId = Number(route.params.id)
  const foundSeries = contentStore.getContentById(seriesId, 'series') as Series
  
  if (foundSeries) {
    series.value = foundSeries
    selectedSeason.value = foundSeries.seasons[0]
  } else {
    // Redirect to 404 if series not found
    router.push('/404')
  }
  
  loading.value = false
})

const toggleWatchlist = () => {
  if (series.value) {
    contentStore.toggleWatchlist(series.value)
  }
}

const watchEpisode = (episode: Episode) => {
  if (series.value) {
    router.push(`/watch/series/${series.value.id}?season=${episode.season}&episode=${episode.episode}`)
  }
}
</script>

<template>
  <div v-if="loading" class="flex justify-center items-center h-[70vh]">
    <div class="animate-pulse-slow">Loading...</div>
  </div>
  
  <div v-else-if="series">
    <!-- Backdrop Header -->
    <div 
      class="relative h-[70vh] min-h-[500px] w-full bg-cover bg-center"
      :style="`background-image: linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.3)), url(${series.backdrop})`"
    >
      <div class="absolute inset-0 flex items-center">
        <div class="container-custom flex flex-col md:flex-row items-center md:items-end">
          <!-- Series Poster -->
          <div class="w-48 md:w-64 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl transform -translate-y-12 md:translate-y-16">
            <img :src="series.poster" :alt="series.title" class="w-full h-auto">
          </div>
          
          <!-- Series Info -->
          <div class="md:ml-8 text-center md:text-left mt-4 md:mt-0">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-2">{{ series.title }}</h1>
            
            <div class="flex flex-wrap justify-center md:justify-start items-center text-sm md:text-base text-gray-300 mb-4">
              <span>{{ new Date(series.releaseDate).getFullYear() }}</span>
              <span class="mx-2">•</span>
              <span>{{ series.totalEpisodes }} episodes</span>
              <span class="mx-2">•</span>
              <span class="capitalize">{{ series.status }}</span>
              <span class="mx-2">•</span>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {{ series.rating.toFixed(1) }}
              </div>
            </div>
            
            <!-- Genres Pills -->
            <div class="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
              <span 
                v-for="genre in series.genres" 
                :key="genre"
                class="px-3 py-1 bg-dark-100/50 text-white text-xs rounded-full"
              >
                {{ genre }}
              </span>
            </div>
            
            <div class="flex flex-wrap gap-4 justify-center md:justify-start">
              <button @click="watchEpisode(series.seasons[0].episodes[0])" class="btn-primary flex items-center">
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
              <button @click="showTrailer = true" class="btn bg-dark-100/70 hover:bg-dark-100 text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Series Details Section -->
    <div class="container-custom py-12 md:py-24">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-2">
          <!-- Overview -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Overview</h2>
            <p class="text-gray-300">{{ series.description }}</p>
          </div>
          
          <!-- Seasons and Episodes -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Episodes</h2>
            
            <!-- Season Tabs -->
            <div class="flex mb-6 overflow-x-auto pb-2">
              <button
                v-for="season in series.seasons"
                :key="season.id"
                @click="selectedSeason = season"
                class="px-4 py-2 mr-2 rounded-md font-medium transition-colors whitespace-nowrap"
                :class="selectedSeason?.id === season.id ? 'bg-primary-600 text-white' : 'bg-dark-100 text-gray-300 hover:bg-dark-400'"
              >
                {{ season.title }}
              </button>
            </div>
            
            <!-- Episode List -->
            <div v-if="selectedSeason" class="space-y-4">
              <div 
                v-for="episode in selectedSeason.episodes" 
                :key="episode.id"
                class="bg-dark-100 rounded-lg overflow-hidden"
              >
                <div class="flex flex-col sm:flex-row">
                  <!-- Episode Thumbnail -->
                  <div class="sm:w-48 flex-shrink-0">
                    <img :src="episode.thumbnail" :alt="episode.title" class="w-full h-full object-cover">
                  </div>
                  
                  <!-- Episode Details -->
                  <div class="p-4 flex flex-col flex-grow justify-between">
                    <div>
                      <div class="flex items-center justify-between">
                        <h3 class="font-semibold text-white">{{ episode.title }}</h3>
                        <span class="text-sm text-gray-400">{{ episode.duration }} min</span>
                      </div>
                      <p class="text-sm text-gray-300 mt-1">{{ episode.description }}</p>
                    </div>
                    
                    <div class="mt-4">
                      <button 
                        @click="watchEpisode(episode)" 
                        class="btn-primary text-sm py-1"
                      >
                        Watch
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Director -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4">Creator</h2>
            <div class="text-gray-300">{{ series.director }}</div>
          </div>
        </div>
        
        <!-- Cast -->
        <div>
          <h2 class="text-2xl font-bold mb-4">Cast</h2>
          <div class="space-y-4">
            <div 
              v-for="member in series.cast" 
              :key="member.id"
              class="flex items-center p-2 rounded-lg transition-colors hover:bg-dark-100"
            >
              <img 
                :src="member.photo" 
                :alt="member.name" 
                class="w-12 h-12 object-cover rounded-full"
              >
              <div class="ml-4">
                <div class="font-medium text-white">{{ member.name }}</div>
                <div class="text-sm text-gray-400">{{ member.character }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Trailer Modal -->
    <div v-if="showTrailer" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div class="w-full max-w-5xl mx-auto p-4">
        <div class="flex justify-end mb-2">
          <button 
            @click="showTrailer = false"
            class="text-white hover:text-primary-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="relative pt-[56.25%] bg-dark-300 rounded-lg overflow-hidden">
          <iframe 
            :src="series.trailer" 
            class="absolute top-0 left-0 w-full h-full"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>