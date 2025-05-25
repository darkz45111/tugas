<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useContentStore } from '../stores/content'
import HeroBanner from '../components/ui/HeroBanner.vue'
import ContentSlider from '../components/ui/ContentSlider.vue'
import { GENRES } from '../types/content'

const contentStore = useContentStore()

// Load watchlist
onMounted(() => {
  contentStore.loadWatchlist()
})

// Get featured content (random trending item)
const featuredContent = computed(() => {
  const trendingItems = contentStore.trendingContent
  if (trendingItems.length > 0) {
    const randomIndex = Math.floor(Math.random() * trendingItems.length)
    return trendingItems[randomIndex]
  }
  return contentStore.allContent[0]
})

// Get genre-specific content
const getGenreContent = (genre: string) => {
  return contentStore.getContentByGenre(genre).slice(0, 10)
}
</script>

<template>
  <div>
    <!-- Hero Banner -->
    <HeroBanner :item="featuredContent" />
    
    <div class="container-custom">
      <!-- Trending Now Section -->
      <ContentSlider 
        title="Trending Now" 
        :items="contentStore.trendingContent" 
        size="medium"
      />
      
      <!-- Recently Added Section -->
      <ContentSlider 
        title="Recently Added" 
        :items="contentStore.recentlyAdded" 
        size="medium"
      />
      
      <!-- Most Popular Section -->
      <ContentSlider 
        title="Most Popular" 
        :items="contentStore.mostPopular" 
        size="medium"
      />
      
      <!-- Genre Categories -->
      <div v-for="genre in GENRES.slice(0, 6)" :key="genre" class="mb-8">
        <ContentSlider 
          :title="genre" 
          :items="getGenreContent(genre)" 
          size="small"
        />
      </div>
    </div>
  </div>
</template>