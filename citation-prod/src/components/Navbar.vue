<template>
  <nav class="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        
        <router-link to="/" class="flex items-center space-x-2">
          <h1 class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform">
            Citation Insights
          </h1>
        </router-link>

        <div class="flex items-center space-x-4">
          <router-link to="/" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
            Accueil
          </router-link>

          <router-link v-if="userStore.isAuthenticated" to="/profile" class="px-4 py-2 text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors">
            Profil
          </router-link>

          <div v-if="!userStore.isAuthenticated" class="flex items-center space-x-2">
            <router-link to="/login" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Connexion
            </router-link>
            <router-link to="/register" class="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg shadow hover:from-indigo-700 hover:to-indigo-800 transition-all">
              S'inscrire
            </router-link>
          </div>

          <div v-else class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <img :src="userStore.user?.avatar || '/default-avatar.png'" class="w-8 h-8 rounded-full ring-2 ring-indigo-100" />
              <span class="font-medium text-gray-900">{{ userStore.user?.username }}</span>
            </div>
            <button @click="handleLogout" class="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore } from '../stores/user.js'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
  userStore.logout() // Assure-toi que cette fonction existe dans ton store
  router.push('/login')
}
</script>