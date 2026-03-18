<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
    <div class="max-w-4xl mx-auto px-4 py-12">
      <div class="text-center mb-16">
        <img src="/default-avatar.png" class="w-32 h-32 rounded-full mx-auto mb-6 ring-8 ring-indigo-100 shadow-2xl" />
        <h1 class="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
          {{ userStore.user?.username || 'Votre Profil' }}
        </h1>
        <p class="text-2xl text-gray-600 mb-2">{{ userStore.user?.email }}</p>
        <p class="text-lg text-gray-500 max-w-2xl mx-auto">{{ userStore.user?.bio }}</p>
      </div>

      <!-- Tabs -->
      <div class="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
        <div class="flex border-b border-gray-200">
          <button 
            @click="activeTab = 'posts'"
            :class="['flex-1 py-6 px-8 font-semibold text-lg border-b-4 transition-all duration-200', activeTab === 'posts' ? 'border-indigo-500 text-indigo-700 bg-indigo-50' : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50']"
          >
            Mes Citations
          </button>
          <button 
            @click="activeTab = 'favorites'"
            :class="['flex-1 py-6 px-8 font-semibold text-lg border-b-4 transition-all duration-200', activeTab === 'favorites' ? 'border-purple-500 text-purple-700 bg-purple-50' : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50']"
          >
            Favoris
          </button>
        </div>

        <!-- Posts Tab -->
        <div v-if="activeTab === 'posts'" class="p-8">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900">Mes Citations ({{ userQuotes.length || 0 }})</h2>
            <CreateQuoteForm @quote-created="loadUserQuotes" />
          </div>
          <div v-if="loadingQuotes" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
          <div v-else-if="userQuotes.length === 0" class="text-center py-20">
            <p class="text-2xl text-gray-500 mb-4">Aucune citation publiée</p>
            <CreateQuoteForm @quote-created="loadUserQuotes" />
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuoteCard 
              v-for="quote in userQuotes" 
              :key="quote._id"
              :quote="quote"
              @toggle-like="handleLike"
            />
          </div>
        </div>

        <!-- Favorites Tab -->
        <div v-if="activeTab === 'favorites'" class="p-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">Citations Favoris</h2>
          <div v-if="!favorites.length" class="text-center py-20 text-gray-500">
            <p class="text-2xl mb-4">Aucun favori</p>
            <p>Explorez et sauvegardez vos citations préférées</p>
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuoteCard 
              v-for="quote in favorites" 
              :key="quote._id"
              :quote="quote"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../stores/user.js'
import QuoteCard from '../components/QuoteCard.vue'
import CreateQuoteForm from '../components/CreateQuoteForm.vue'
import axios from 'axios' 

const userStore = useUserStore()

const activeTab = ref('posts')
const userQuotes = ref([])
const favorites = ref([])
const loadingQuotes = ref(false)

const loadUserQuotes = async () => {
  loadingQuotes.value = true
  try {
   
    setTimeout(() => { loadingQuotes.value = false }, 500)
  } catch (error) {
    console.error("Erreur lors du chargement des citations", error)
    loadingQuotes.value = false
  }
}

// Fonction manquante pour like
const handleLike = (quoteId) => {
  console.log("Like cliqué pour :", quoteId)
  // Logique pour mettre à jour le like en base de données
}

onMounted(() => {
  if (userStore.user) {
    loadUserQuotes()
  }
})
</script>

