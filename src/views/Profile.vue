<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Mock watch history
const watchHistory = ref([
  { 
    id: 1, 
    title: 'Extraction', 
    type: 'movie',
    progress: 75, 
    lastWatched: '2024-01-15T18:30:00',
    image: 'https://images.pexels.com/photos/7991162/pexels-photo-7991162.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  { 
    id: 101, 
    title: 'The Crown - Season 1, Episode 2', 
    type: 'series',
    progress: 45, 
    lastWatched: '2024-01-12T21:15:00',
    image: 'https://images.pexels.com/photos/5825576/pexels-photo-5825576.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  { 
    id: 3, 
    title: 'Interstellar', 
    type: 'movie',
    progress: 100, 
    lastWatched: '2024-01-10T20:00:00',
    image: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
])

// Form data for profile editing
const profileForm = reactive({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Form state
const isEditing = ref(false)
const formErrors = reactive({
  name: '',
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const formSuccess = ref('')

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Toggle editing mode
const toggleEditMode = () => {
  isEditing.value = !isEditing.value
  formSuccess.value = ''
  
  // Reset form if canceling
  if (!isEditing.value) {
    profileForm.name = authStore.user?.name || ''
    profileForm.email = authStore.user?.email || ''
    profileForm.currentPassword = ''
    profileForm.newPassword = ''
    profileForm.confirmPassword = ''
    
    // Clear errors
    formErrors.name = ''
    formErrors.email = ''
    formErrors.currentPassword = ''
    formErrors.newPassword = ''
    formErrors.confirmPassword = ''
  }
}

// Validate form
const validateForm = () => {
  let isValid = true
  
  // Reset errors
  formErrors.name = ''
  formErrors.email = ''
  formErrors.currentPassword = ''
  formErrors.newPassword = ''
  formErrors.confirmPassword = ''
  
  // Validate name
  if (!profileForm.name) {
    formErrors.name = 'Name is required'
    isValid = false
  }
  
  // Validate email
  if (!profileForm.email) {
    formErrors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileForm.email)) {
    formErrors.email = 'Please enter a valid email address'
    isValid = false
  }
  
  // Validate password fields (only if attempting to change password)
  if (profileForm.newPassword || profileForm.confirmPassword) {
    if (!profileForm.currentPassword) {
      formErrors.currentPassword = 'Current password is required to change password'
      isValid = false
    }
    
    if (profileForm.newPassword.length < 6) {
      formErrors.newPassword = 'New password must be at least 6 characters'
      isValid = false
    }
    
    if (profileForm.newPassword !== profileForm.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match'
      isValid = false
    }
  }
  
  return isValid
}

// Save profile changes
const saveChanges = () => {
  if (!validateForm()) return
  
  // In a real app, this would send data to an API
  // For demo, just update local state
  if (authStore.user) {
    const updatedUser = {
      ...authStore.user,
      name: profileForm.name,
      email: profileForm.email
    }
    
    // Update user in store and localStorage
    authStore.user = updatedUser
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    // Show success message
    formSuccess.value = 'Profile updated successfully'
    
    // Reset password fields
    profileForm.currentPassword = ''
    profileForm.newPassword = ''
    profileForm.confirmPassword = ''
    
    // Exit edit mode
    isEditing.value = false
  }
}

// Handle logout
const logout = () => {
  authStore.logout()
  router.push('/login')
}

// Continue watching
const continueWatching = (item: any) => {
  router.push(`/watch/${item.type}/${item.id}`)
}
</script>

<template>
  <div class="container-custom py-8">
    <!-- Profile Header -->
    <div class="bg-dark-200 rounded-xl p-6 md:p-8 mb-8">
      <div class="flex flex-col md:flex-row items-center">
        <!-- Profile Image -->
        <div class="mb-4 md:mb-0 md:mr-8">
          <img 
            :src="authStore.user?.avatar" 
            alt="Profile" 
            class="w-24 h-24 rounded-full object-cover border-4 border-primary-500"
          >
        </div>
        
        <!-- Profile Information -->
        <div class="flex-1">
          <div v-if="!isEditing" class="text-center md:text-left">
            <h1 class="text-2xl font-bold">{{ authStore.user?.name }}</h1>
            <p class="text-gray-400 mt-1">{{ authStore.user?.email }}</p>
            
            <div class="mt-4 space-x-3">
              <button @click="toggleEditMode" class="btn-primary text-sm">
                Edit Profile
              </button>
              <button @click="logout" class="btn bg-dark-100 hover:bg-dark-100/70 text-sm text-white">
                Logout
              </button>
            </div>
          </div>
          
          <!-- Edit Profile Form -->
          <form v-else @submit.prevent="saveChanges" class="w-full max-w-xl mx-auto md:mx-0 space-y-4">
            <!-- Success Message -->
            <div v-if="formSuccess" class="bg-green-500/20 border border-green-600 text-green-100 px-4 py-3 rounded mb-4">
              {{ formSuccess }}
            </div>
            
            <!-- Name Field -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                v-model="profileForm.name"
                type="text"
                id="name"
                class="input"
                :class="{ 'border-red-500 focus:ring-red-500': formErrors.name }"
              />
              <p v-if="formErrors.name" class="mt-1 text-sm text-red-500">
                {{ formErrors.name }}
              </p>
            </div>
            
            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                v-model="profileForm.email"
                type="email"
                id="email"
                class="input"
                :class="{ 'border-red-500 focus:ring-red-500': formErrors.email }"
              />
              <p v-if="formErrors.email" class="mt-1 text-sm text-red-500">
                {{ formErrors.email }}
              </p>
            </div>
            
            <!-- Password Section -->
            <div class="pt-4 border-t border-gray-700">
              <h3 class="text-lg font-medium text-white mb-4">Change Password</h3>
              
              <!-- Current Password -->
              <div class="mb-4">
                <label for="currentPassword" class="block text-sm font-medium text-gray-300 mb-1">
                  Current Password
                </label>
                <input
                  v-model="profileForm.currentPassword"
                  type="password"
                  id="currentPassword"
                  class="input"
                  :class="{ 'border-red-500 focus:ring-red-500': formErrors.currentPassword }"
                />
                <p v-if="formErrors.currentPassword" class="mt-1 text-sm text-red-500">
                  {{ formErrors.currentPassword }}
                </p>
              </div>
              
              <!-- New Password -->
              <div class="mb-4">
                <label for="newPassword" class="block text-sm font-medium text-gray-300 mb-1">
                  New Password
                </label>
                <input
                  v-model="profileForm.newPassword"
                  type="password"
                  id="newPassword"
                  class="input"
                  :class="{ 'border-red-500 focus:ring-red-500': formErrors.newPassword }"
                />
                <p v-if="formErrors.newPassword" class="mt-1 text-sm text-red-500">
                  {{ formErrors.newPassword }}
                </p>
              </div>
              
              <!-- Confirm Password -->
              <div>
                <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  v-model="profileForm.confirmPassword"
                  type="password"
                  id="confirmPassword"
                  class="input"
                  :class="{ 'border-red-500 focus:ring-red-500': formErrors.confirmPassword }"
                />
                <p v-if="formErrors.confirmPassword" class="mt-1 text-sm text-red-500">
                  {{ formErrors.confirmPassword }}
                </p>
              </div>
            </div>
            
            <!-- Form Buttons -->
            <div class="flex space-x-3 pt-4">
              <button type="submit" class="btn-primary flex-1">
                Save Changes
              </button>
              <button type="button" @click="toggleEditMode" class="btn bg-dark-100 hover:bg-dark-100/70 text-white">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Watch History Section -->
    <div class="bg-dark-200 rounded-xl p-6 md:p-8">
      <h2 class="text-xl font-semibold mb-6">Continue Watching</h2>
      
      <div class="space-y-4">
        <div 
          v-for="(item, index) in watchHistory" 
          :key="index"
          class="bg-dark-100 rounded-lg overflow-hidden"
        >
          <div class="flex flex-col sm:flex-row">
            <!-- Thumbnail -->
            <div class="sm:w-40 h-24 sm:h-auto flex-shrink-0 relative">
              <img :src="item.image" :alt="item.title" class="w-full h-full object-cover">
              
              <!-- Play Button Overlay -->
              <div class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
                <button 
                  @click="continueWatching(item)"
                  class="text-white p-2 rounded-full bg-primary-600/80 hover:bg-primary-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Details -->
            <div class="p-4 flex flex-col justify-between flex-grow">
              <div>
                <div class="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 class="font-medium text-white">{{ item.title }}</h3>
                  <span class="text-sm text-gray-400 mt-1 sm:mt-0">
                    {{ formatDate(item.lastWatched) }}
                  </span>
                </div>
                
                <!-- Progress bar -->
                <div class="mt-2 md:mt-4">
                  <div class="h-1 w-full bg-gray-700 rounded-full">
                    <div 
                      class="h-full bg-primary-500 rounded-full" 
                      :style="`width: ${item.progress}%`"
                    ></div>
                  </div>
                  <div class="flex justify-between items-center mt-1 text-xs text-gray-400">
                    <span>{{ item.progress }}% complete</span>
                    <span v-if="item.progress < 100">Continue</span>
                    <span v-else>Completed</span>
                  </div>
                </div>
              </div>
              
              <div class="mt-4 flex justify-end">
                <button 
                  @click="continueWatching(item)"
                  class="btn-primary py-1 text-sm"
                >
                  {{ item.progress < 100 ? 'Continue' : 'Watch Again' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>