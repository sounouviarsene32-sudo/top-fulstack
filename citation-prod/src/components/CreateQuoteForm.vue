<template>
  <div class="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200 max-w-2xl mx-auto">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Partager une nouvelle citation</h3>
    <form @submit.prevent="submitQuote" class="space-y-6">
      <!-- Text area -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Votre citation</label>
        <textarea 
          v-model="form.text" 
          rows="4"
          class="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-vertical"
          placeholder="Tapez votre citation inspirante ici..."
        ></textarea>
      </div>

      <!-- Image upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Image (optionnel)</label>
        <input 
          type="file" 
          @change="handleImage" 
          accept="image/*"
          class="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        <div v-if="form.imagePreview" class="mt-4">
          <img :src="form.imagePreview" class="max-w-full h-48 object-cover rounded-xl shadow-md" />
        </div>
      </div>

      <!-- Tags -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Tags (séparés par des virgules)</label>
        <input 
          v-model="form.tagsInput" 
          @keyup.enter="addTag"
          class="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="inspiration, motivation, succès..."
        />
        <div v-if="form.tags.length" class="flex flex-wrap gap-2 mt-3">
          <span 
            v-for="(tag, index) in form.tags" 
            :key="index"
            class="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
          >
            {{ tag }}
            <button @click="removeTag(index)" type="button" class="ml-2 text-indigo-600 hover:text-indigo-800">
              ×
            </button>
          </span>
        </div>
      </div>

      <!-- Submit button -->
      <button 
        type="submit" 
        :disabled="!form.text.trim() || isSubmitting"
        class="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <span v-if="isSubmitting">Publication...</span>
        <span v-else>Publier ma citation</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios' // Importé ET utilisé maintenant !
import { useUserStore } from '../stores/user.js'
import { useToastStore } from '../stores/toast.js'

const emit = defineEmits(['quote-created'])
const userStore = useUserStore()
const toastStore = useToastStore()

const form = ref({
  text: '',
  image: null,
  imagePreview: '',
  tags: [],
  tagsInput: ''
})

const isSubmitting = ref(false)

// ... (garder les fonctions addTag, removeTag et handleImage comme avant)

const submitQuote = async () => {
  if (form.value.tagsInput.trim()) addTag()

  if (!userStore.token) {
    toastStore.show('Vous devez être connecté', 'error')
    return
  }

  isSubmitting.value = true

  // 1. On prépare l'objet FormData (le conteneur pour envoyer texte + fichier)
  const formData = new FormData()
  formData.append('text', form.value.text)
  formData.append('tags', JSON.stringify(form.value.tags))
  
  if (form.value.image) {
    formData.append('image', form.value.image)
  }

  try {
    // 2. UTILISATION D'AXIOS : Envoi réel au serveur
    const response = await axios.post('http://localhost:5000/api/quotes', formData, {
      headers: { 
        // On précise que c'est un envoi de fichier (multipart)
        'Content-Type': 'multipart/form-data',
        // On envoie ton Token JWT pour prouver que c'est bien Arsène qui publie
        'Authorization': `Bearer ${userStore.token}`
      }
    })

    // 3. Si ça marche, on prévient le reste de l'appli
    emit('quote-created')
    toastStore.show('Félicitations, citation publiée !', 'success')
    
    // Reset du formulaire
    form.value = { text: '', image: null, imagePreview: '', tags: [], tagsInput: '' }

  } catch (error) {
    console.error("Erreur Axios :", error)
    // On affiche l'erreur précise renvoyée par ton Backend
    toastStore.show(error.response?.data?.message || 'Erreur de connexion au serveur', 'error')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
</style>

