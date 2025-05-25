<script setup lang="ts">
import { onMounted } from 'vue'
import { useContentStore } from '../stores/content'
import ContentCard from '../components/ui/ContentCard.vue'

const contentStore = useContentStore()

onMounted(() => {
  contentStore.loadWatchlist()
})
</script>

<template>
  <div class="container-custom py-8">
    <h1 class="text-3xl font-bold mb-8">My Watchlist</h1>
    
    <!-- Watchlist Grid -->
    <div v-if="contentStore.watchlist.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      <ContentCard 
        v-for="item in contentStore.watchlist" 
        :key="`${item.type}-${item.id}`"
        :item="item"
        size="medium"
      />
    </div>
    
    <!-- Empty Watchlist -->
    <div v-else class="text-center py-20">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      <h3 class="text-xl font-semibold text-gray-300 mb-2">Your watchlist is empty</h3>
      <p class="text-gray-400 mb-6">Add movies and series to your list to watch later</p>
      <router-link to="/" class="btn-primary">Browse Content</router-link>
    </div>
  </div>
</template>