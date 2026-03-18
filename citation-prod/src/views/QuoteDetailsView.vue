<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
    <Navbar />
    <div class="max-w-4xl mx-auto px-4 py-12">
      <!-- Quote Header -->
      <div class="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-12 mb-12 border border-white/50">
        <div class="flex items-start space-x-6">
          <div class="flex-shrink-0">
            <img :src="quote.author.avatar" class="w-20 h-20 rounded-full ring-4 ring-indigo-100" />
          </div>
          <div class="flex-1 min-w-0">
            <h1 class="text-4xl md:text-5xl leading-tight text-gray-900 mb-4 font-medium">{{ quote.text }}</h1>
            <div class="flex items-center space-x-4 text-gray-600">
              <span class="text-xl font-semibold text-indigo-600">{{ quote.author.username }}</span>
              <span>• {{ formatDate(quote.createdAt) }}</span>
              <div class="flex items-center space-x-2">
                <span v-for="tag in quote.tags" :key="tag" class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-4 text-2xl">
            <button @click="toggleLike" class="p-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 transition-colors">
              <svg :class="['w-8 h-8', isLiked ? 'text-red-500 fill-red-500' : 'text-gray-400']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </button>
            <span class="font-bold text-gray-900">{{ quote.likesCount }}</span>
          </div>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="space-y-8">
        <div class="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-white/50">
          <h2 class="text-3xl font-bold text-gray-900 mb-8">Commentaires ({{ quote.commentsCount }})</h2>
          <CreateCommentForm :quote-id="quote._id" @comment-created="loadComments" />
        </div>

        <div v-if="loadingComments" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>

        <div v-else class="space-y-6">
          <Comment 
            v-for="comment in comments" 
            :key="comment._id"
            :comment="comment"
            @delete="deleteComment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import axios from 'axios'
import Navbar from '../components/Navbar.vue'
import Comment from '../components/Comment.vue'
import CreateCommentForm from '../components/CreateCommentForm.vue'

const route = useRoute()
const userStore = useUserStore()

// États réactifs
const quote = ref({
  text: '',
  author: { username: '', avatar: '' },
  tags: [],
  likesCount: 0,
  commentsCount: 0,
  createdAt: new Date()
})
const comments = ref([])
const isLiked = ref(false)
const loadingComments = ref(false)

// 1. Charger la citation via l'ID dans l'URL
const fetchQuote = async () => {
  try {
    const quoteId = route.params.id // Récupère l'ID depuis l'URL /quote/:id
    const response = await axios.get(`http://localhost:5000/api/quotes/${quoteId}`)
    quote.value = response.data
  } catch (error) {
    console.error("Erreur lors de la récupération de la citation", error)
  }
}

// 2. Formater la date proprement
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 3. Gérer le Like
const toggleLike = async () => {
  if (!userStore.user) return alert("Connectez-vous pour liker !")
  try {
    // Appel API pour liker/disliker
    await axios.post(`http://localhost:5000/api/quotes/${quote.value._id}/like`, {}, {
      headers: { Authorization: `Bearer ${userStore.token}` }
    })
    isLiked.value = !isLiked.value
    isLiked.value ? quote.value.likesCount++ : quote.value.likesCount--
  } catch (error) {
    console.error("Erreur Like", error)
  }
}

// 4. Charger les commentaires
const loadComments = async () => {
  loadingComments.value = true
  try {
    const response = await axios.get(`http://localhost:5000/api/quotes/${route.params.id}/comments`)
    comments.value = response.data
  } catch (error) {
    console.error("Erreur commentaires", error)
  } finally {
    loadingComments.value = false
  }
}

// Lancer tout ça au chargement de la page
onMounted(() => {
  fetchQuote()
  loadComments()
})
</script>

