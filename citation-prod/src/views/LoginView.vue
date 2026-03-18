<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
    <Navbar />
    <div class="max-w-md mx-auto">
      <div class="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-10 border border-white/50">
        <h1 class="text-4xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-8">
          Connexion
        </h1>
        <form @submit.prevent="login" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Email</label>
            <input 
              v-model="form.email"
              type="email"
              required
              class="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-200"
              placeholder="votre@email.com"
            >
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Mot de passe</label>
            <input 
              v-model="form.password"
              type="password"
              required
              class="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-200"
              placeholder="••••••••"
            >
          </div>
          <button 
            :disabled="loading"
            type="submit"
            class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span v-if="loading">Connexion...</span>
            <span v-else>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14"></path>
              </svg>
              Entrer
            </span>
          </button>
        </form>
        <p class="mt-8 text-center text-sm text-gray-600">
          Pas de compte ? 
          <router-link to="/register" class="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
            S'inscrire
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import Navbar from '../components/Navbar.vue'

const router = useRouter()
const userStore = useUserStore()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)

const login = async () => {
  loading.value = true
  const result = await userStore.login(form.value)
  loading.value = false
  
  if (result.success) {
    router.push('/profile')
  } else {
    alert(result.message)
  }
}
</script>

