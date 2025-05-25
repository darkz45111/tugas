<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useContentStore } from '../stores/content'
import { GENRES, YEARS, RATINGS, SORT_OPTIONS } from '../types/content'
import ContentCard from '../components/ui/ContentCard.vue'

const contentStore = useContentStore()
const isLoading = ref(false)
const sortBy = ref('newest')

// Initialize search with empty results
onMounted(() => {
  contentStore.searchQuery = ''
  contentStore.searchFilters = {
    genre: '',
    year: '',
    rating: 0
  }
  contentStore.searchContent()
})

// Apply filters and search
const applyFilters = () => {
  isLoading.value = true
  contentStore.searchContent()
  
  // Sort results based on selected option
  sortResults()
  
  // Simulate loading delay
  setTimeout(() => {
    isLoading.value = false
  }, 600)
}

// Reset all filters
const resetFilters = () => {
  contentStore.searchQuery = ''
  contentStore.searchFilters = {
    genre: '',
    year: '',
    rating: 0
  }
  sortBy.value = 'newest'
  applyFilters()
}

// Sort search results
const sortResults = () => {
  const results = contentStore.searchResults
  
  switch(sortBy.value) {
    case 'newest':
      results.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
      break
    case 'popular':
      results.sort((a, b) => b.views - a.views)
      break
    case 'rating':
      results.sort((a, b) => b.rating - a.rating)
      break
  }
}
</script>

<template>
  <div class="container-custom py-8">
    <h1 class="text-3xl font-bold mb-8">Discover</h1>
    
    <!-- Search & Filter Controls -->
    <div class="bg-dark-200 rounded-xl p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Search Input -->
        <div>
          <label for="search" class="block text-sm font-medium text-gray-400 mb-2">
            Search Titles
          </label>
          <input
            v-model="contentStore.searchQuery"
            type="text"
            id="search"
            placeholder="Search for movies or series..."
            class="input"
          />
        </div>
        
        <!-- Genre Filter -->
        <div>
          <label for="genre" class="block text-sm font-medium text-gray-400 mb-2">
            Genre
          </label>
          <select 
            v-model="contentStore.searchFilters.genre"
            id="genre"
            class="input"
          >
            <option value="">All Genres</option>
            <option v-for="genre in GENRES" :key="genre" :value="genre">
              {{ genre }}
            </option>
          </select>
        </div>
        
        <!-- Year Filter -->
        <div>
          <label for="year" class="block text-sm font-medium text-gray-400 mb-2">
            Release Year
          </label>
          <select 
            v-model="contentStore.searchFilters.year"
            id="year"
            class="input"
          >
            <option value="">All Years</option>
            <option v-for="year in YEARS" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        
        <!-- Rating Filter -->
        <div>
          <label for="rating" class="block text-sm font-medium text-gray-400 mb-2">
            Minimum Rating
          </label>
          <select 
            v-model="contentStore.searchFilters.rating"
            id="rating"
            class="input"
          >
            <option v-for="option in RATINGS" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
      
      <!-- Second Row for Sort and Buttons -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <!-- Sort Options -->
        <div>
          <label for="sort" class="block text-sm font-medium text-gray-400 mb-2">
            Sort By
          </label>
          <select 
            v-model="sortBy"
            id="sort"
            class="input"
            @change="sortResults"
          >
            <option v-for="option in SORT_OPTIONS" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        
        <!-- Buttons -->
        <div class="md:col-span-2 flex items-end space-x-4">
          <button @click="resetFilters" class="btn bg-dark-100 hover:bg-dark-100/70 text-white">
            Reset Filters
          </button>
          <button @click="applyFilters" class="btn-primary flex-1">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
    
    <!-- Results Section -->
    <div>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold">
          Results ({{ contentStore.searchResults.length }})
        </h2>
      </div>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center py-20">
        <div class="animate-spin h-10 w-10 rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
      
      <!-- Results Grid -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        <ContentCard 
          v-for="item in contentStore.searchResults" 
          :key="`${item.type}-${item.id}`"
          :item="item"
          size="medium"
        />
      </div>
      
      <!-- Empty Results Message -->
      <div 
        v-if="!isLoading && contentStore.searchResults.length === 0" 
        class="text-center py-20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-300 mb-2">No results found</h3>
        <p class="text-gray-400">Try adjusting your search or filter criteria</p>
        <button @click="resetFilters" class="mt-4 btn-primary">Clear Filters</button>
      </div>
    </div>
  </div>
</template>