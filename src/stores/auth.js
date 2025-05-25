import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const error = ref(null)

  function checkAuth() {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
      isAuthenticated.value = true
    }
  }

  async function login(data) {
    isLoading.value = true
    error.value = null

    try {
      // Simulasi API delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Validasi login (mock)
      if (data.email === 'user@example.com' && data.password === 'password') {
        const mockUser = {
          id: 1,
          name: 'John Doe',
          email: data.email,
          avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
        }

        user.value = mockUser
        isAuthenticated.value = true
        localStorage.setItem('user', JSON.stringify(mockUser))
        return true
      } else {
        throw new Error('Invalid email or password')
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Login failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function register(data) {
    isLoading.value = true
    error.value = null

    try {
      // Simulasi API delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      const mockUser = {
        id: Math.floor(Math.random() * 1000) + 1,
        name: data.name,
        email: data.email,
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
      }

      user.value = mockUser
      isAuthenticated.value = true
      localStorage.setItem('user', JSON.stringify(mockUser))
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Registration failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user')
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    checkAuth
  }
})
