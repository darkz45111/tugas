export interface Episode {
  id: number
  title: string
  description: string
  duration: number
  thumbnail: string
  season: number
  episode: number
}

export interface Season {
  id: number
  title: string
  episodes: Episode[]
}

export interface CastMember {
  id: number
  name: string
  character: string
  photo: string
}

interface BaseContent {
  id: number
  title: string
  description: string
  poster: string
  backdrop: string
  rating: number
  releaseDate: string
  genres: string[]
  trailer: string
  cast: CastMember[]
  director: string
  views: number
  trending: boolean
}

export interface Movie extends BaseContent {
  type: 'movie'
  duration: number // in minutes
}

export interface Series extends BaseContent {
  type: 'series'
  seasons: Season[]
  totalEpisodes: number
  status: 'ongoing' | 'ended'
}

export type ContentItem = Movie | Series

export const GENRES = [
  'Action',
  'Drama',
  'Comedy',
  'Sci-Fi',
  'Romance',
  'Horror',
  'Thriller',
  'Animation',
  'Documentary',
  'Fantasy'
]

export const YEARS = [
  '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'
]

export const RATINGS = [
  { value: 9, label: '9+' },
  { value: 8, label: '8+' },
  { value: 7, label: '7+' },
  { value: 6, label: '6+' },
  { value: 5, label: '5+' },
  { value: 0, label: 'All' }
]

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' }
]