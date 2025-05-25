import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Movie, Series, ContentItem } from '../types/content'
import { movies, series } from '../data/content'

export const useContentStore = defineStore('content', () => {
  const allMovies = ref<Movie[]>(movies)
  const allSeries = ref<Series[]>(series)
  const watchlist = ref<ContentItem[]>([])
  const searchResults = ref<ContentItem[]>([])
  const searchQuery = ref('')
  const searchFilters = ref({
    genre: '',
    year: '',
    rating: 0
  })

  // Combine movies and series for certain operations
  const allContent = computed((): ContentItem[] => {
    return [...allMovies.value, ...allSeries.value]
  })

  // Get content by categories
  const getContentByGenre = (genre: string): ContentItem[] => {
    return allContent.value.filter(item => item.genres.includes(genre))
  }

  // Get trending content
  const trendingContent = computed((): ContentItem[] => {
    return allContent.value
      .filter(item => item.trending)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10)
  })

  // Get recently added content
  const recentlyAdded = computed((): ContentItem[] => {
    return [...allContent.value]
      .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
      .slice(0, 10)
  })

  // Get most popular content
  const mostPopular = computed((): ContentItem[] => {
    return [...allContent.value]
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)
  })

  // Get content by ID and type
  const getContentById = (id: number, type: 'movie' | 'series'): ContentItem | undefined => {
    return type === 'movie' 
      ? allMovies.value.find(movie => movie.id === id)
      : allSeries.value.find(series => series.id === id)
  }

  // Add or remove from watchlist
  const toggleWatchlist = (item: ContentItem): void => {
    const index = watchlist.value.findIndex(i => i.id === item.id && i.type === item.type)
    if (index === -1) {
      watchlist.value.push(item)
      // Save to localStorage in a real app
      localStorage.setItem('watchlist', JSON.stringify(watchlist.value))
    } else {
      watchlist.value.splice(index, 1)
      localStorage.setItem('watchlist', JSON.stringify(watchlist.value))
    }
  }

  // Check if item is in watchlist
  const isInWatchlist = (item: ContentItem): boolean => {
    return watchlist.value.some(i => i.id === item.id && i.type === item.type)
  }

  // Load watchlist from localStorage
  const loadWatchlist = (): void => {
    const saved = localStorage.getItem('watchlist')
    if (saved) {
      watchlist.value = JSON.parse(saved)
    }
  }

  // Search content
  const searchContent = (): void => {
    const query = searchQuery.value.toLowerCase()
    
    let results = allContent.value.filter(item => {
      const matchesQuery = 
        query === '' || 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      
      const matchesGenre = 
        searchFilters.value.genre === '' || 
        item.genres.includes(searchFilters.value.genre)
        
      const matchesYear = 
        searchFilters.value.year === '' || 
        new Date(item.releaseDate).getFullYear().toString() === searchFilters.value.year
        
      const matchesRating = 
        searchFilters.value.rating === 0 || 
        item.rating >= searchFilters.value.rating
        
      return matchesQuery && matchesGenre && matchesYear && matchesRating
    })
    
    searchResults.value = results
  }

  return {
    allMovies,
    allSeries,
    allContent,
    watchlist,
    searchResults,
    searchQuery,
    searchFilters,
    getContentByGenre,
    trendingContent,
    recentlyAdded,
    mostPopular,
    getContentById,
    toggleWatchlist,
    isInWatchlist,
    loadWatchlist,
    searchContent
  }
})