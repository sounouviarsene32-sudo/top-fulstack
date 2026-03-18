<template>
  <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-8 border border-gray-100 hover:border-indigo-200 overflow-hidden">
    
    <div v-if="quote.image" class="relative w-full h-48 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl mb-6 overflow-hidden">
      <img :src="quote.image" :alt="quote.text.slice(0,50)" class="w-full h-full object-cover shadow-2xl transition-transform duration-500 group-hover:scale-110" />
      
      <div class="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md rounded-xl p-3 text-white border border-white/20">
        <p class="text-sm leading-tight font-medium line-clamp-2">{{ quote.text }}</p>
      </div>
    </div>
    
    <div class="mb-6">
      <p class="text-2xl md:text-3xl leading-relaxed text-gray-900 font-medium mb-4">{{ quote.text }}</p>
      <div class="flex items-center space-x-3 text-sm text-gray-500">
        <span class="font-semibold text-indigo-600">{{ quote.author?.username || 'Anonyme' }}</span>
        <span>• {{ formatDate(quote.createdAt) }}</span>
        
        <div class="flex flex-wrap items-center gap-2">
          <span v-for="tag in quote.tags?.slice(0,3)" :key="tag" class="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
            #{{ tag }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between pt-6 border-t border-gray-100">
      <div class="flex items-center space-x-4 text-gray-500">
        <button @click="toggleLike" class="flex items-center space-x-2 p-2 hover:bg-red-50 rounded-xl transition-colors group/like">
          <svg :class="['w-6 h-6 transition-all', isLiked ? 'text-red-500 fill-red-500 scale-110' : 'text-gray-400 group-hover/like:text-red-400']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          <span :class="{'text-red-600 font-bold': isLiked}">{{ quote.likesCount || 0 }}</span>
        </button>

        <button @click="$emit('open-comments', quote._id)" class="flex items-center space-x-2 p-2 hover:bg-indigo-50 rounded-xl hover:text-indigo-600 transition-colors">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
          <span>{{ quote.commentsCount || 0 }}</span>
        </button>
      </div>

      <router-link :to="`/quotes/${quote._id}`" class="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors flex items-center">
        Détails <span class="ml-1 text-lg">voir plus-→</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/user.js'

const props = defineProps({
  quote: { type: Object, required: true }
})

const emit = defineEmits(['toggle-like', 'open-comments'])
const userStore = useUserStore()

// Vérification du Like sécurisée
const isLiked = computed(() => {
  if (!userStore.user || !props.quote.likes) return false
  // On vérifie si l'ID de l'utilisateur connecté est présent dans la liste des likes
  return props.quote.likes.some(like => {
    const userId = typeof like === 'object' ? (like.user?._id || like.user) : like
    return userId === userStore.user._id
  })
})

const toggleLike = () => {
  if (!userStore.isAuthenticated) {
    alert("Connectez-vous pour liker !") // À remplacer par un Toast plus tard
    return
  }
  emit('toggle-like', props.quote._id)
}

const formatDate = (dateString) => {
  if (!dateString) return 'Date inconnue'
  return new Date(dateString).toLocaleDateString('fr-FR', { 
    day: 'numeric', month: 'short', year: 'numeric' 
  })
}
</script>