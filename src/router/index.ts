import { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import NotFound from '../views/NotFound.vue'

// Lazy loaded routes for better performance
const MovieDetail = () => import('../views/MovieDetail.vue')
const SeriesDetail = () => import('../views/SeriesDetail.vue')
const Watch = () => import('../views/Watch.vue')
const Search = () => import('../views/Search.vue')
const Watchlist = () => import('../views/Watchlist.vue')
const Profile = () => import('../views/Profile.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/series/:id',
    name: 'SeriesDetail',
    component: SeriesDetail,
    meta: { requiresAuth: true }
  },
  {
    path: '/watch/:type/:id',
    name: 'Watch',
    component: Watch,
    meta: { requiresAuth: true }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta: { requiresAuth: true }
  },
  {
    path: '/watchlist',
    name: 'Watchlist',
    component: Watchlist,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default routes