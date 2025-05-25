import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { movies, series } from '../data/content'

export const useContentStore = defineStore('content', () => {
  const allMovies = ref(movies)
  const allSeries = ref(series)
  const watchlist = ref([])
  const searchResults = ref([])
  const searchQuery = ref('')
  const searchFilters = ref({
    genre: '',
    year: '',
    rating: 0
  })

  // Gabungkan movie & series
  const allContent = computed(() => {
    return [...allMovies.value, ...allSeries.value]
  })

  // Konten berdasarkan genre
  const getContentByGenre = (genre) => {
    return allContent.value.filter(item => item.genres.includes(genre))
  }

  // Konten trending
  const trendingContent = computed(() => {
    return allContent.value
      .filter(item => item.trending)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10)
  })

  // Konten terbaru
  const recentlyAdded = computed(() => {
    return [...allContent.value]
      .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
      .slice(0, 10)
  })

  // Konten populer
  const mostPopular = computed(() => {
    return [...allContent.value]
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)
  })

  // Ambil konten berdasarkan ID dan jenis
  const getContentById = (id, type) => {
    return type === 'movie'
      ? allMovies.value.find(movie => movie.id === id)
      : allSeries.value.find(series => series.id === id)
  }

  // Tambah atau hapus dari watchlist
  const toggleWatchlist = (item) => {
    const index = watchlist.value.findIndex(i => i.id === item.id && i.type === item.type)
    if (index === -1) {
      watchlist.value.push(item)
    } else {
      watchlist.value.splice(index, 1)
    }
    localStorage.setItem('watchlist', JSON.stringify(watchlist.value))
  }

  // Cek apakah item ada di watchlist
  const isInWatchlist = (item) => {
    return watchlist.value.some(i => i.id === item.id && i.type === item.type)
  }

  // Load watchlist dari localStorage
  const loadWatchlist = () => {
    const saved = localStorage.getItem('watchlist')
    if (saved) {
      watchlist.value = JSON.parse(saved)
    }
  }

  // Fitur pencarian
  const searchContent = () => {
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
