<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
    <Navbar />
    <div class="max-w-md mx-auto">
      <div class="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-10 border border-white/50">
        <h1 class="text-4xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-8">
          Inscription
        </h1>
        <form @submit.prevent="register" class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Nom d'utilisateur</label>
            <input 
              v-model="form.username"
              required
              class="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all duration-200"
              placeholder="Votre nom d'utilisateur"
            >
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Email</label>
            <input 
              v-model="form.email"
              type="email"
              required
              class="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all duration-200"
              placeholder="votre@email.com"
            >
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">Mot de passe</label>
            <input 
              v-model="form.password"
              type="password"
              required
              class="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all duration-200"
              placeholder="••••••••"
              minlength="6"
            >
          </div>
          <button 
              :disabled="loading"
              type="submit"
              class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Création...
              </span>
              <div v-else class="flex items-center justify-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>S'inscrire</span>
              </div>
            </button>
        </form>
        <p class="mt-8 text-center text-sm text-gray-600">
          Déjà un compte ? 
          <router-link to="/login" class="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
            Se connecter
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import Navbar from '../components/Navbar.vue'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
  username: '',
  email: '',
  password: ''
})

const loading = ref(false)

const register = async () => {
  if (loading.value) return 
  
  loading.value = true
  try {
    
    const result = await userStore.register({ ...form })
    
    if (result.success) {
      router.push('/login')
    } else {
      alert(result.message || "Erreur lors de l'inscription")
    }
  } catch (error) {
    alert("Le serveur ne répond pas. Vérifie ta connexion.")
  } finally {
    loading.value = false
  }
}
</script>

