<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
    <!-- Navbar -->
    <nav class="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <router-link to="/" class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Citation Insights
          </router-link>
          <div class="flex items-center space-x-4">
            <router-link to="/login" class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
              Login
            </router-link>
            <router-link to="/register" class="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 transition-all">
              Start Sharing
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <section class="pt-24 pb-20 px-4 text-center">
      <h1 class="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
        Share Insights<br>
        <span class="text-indigo-600">Smarter, Not Harder</span>
      </h1>
      <div class="flex flex-col sm:flex-row gap-4 justify-center mt-10">
        <button @click="goToRegister" class="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:scale-105 transition-transform">
          Start Free Trial
        </button>
        <button class="px-8 py-4 bg-white border border-gray-200 rounded-xl font-bold hover:shadow-lg transition-shadow">
          Watch Demo
        </button>
      </div>
    </section>
    <!-- Stats Section -->
    <section class="py-20 bg-white/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div class="text-4xl font-bold text-indigo-600 mb-2">100K+</div>
          <div class="text-gray-600 font-medium">Utilisateurs actifs</div>
        </div>
        <div>
          <div class="text-4xl font-bold text-purple-600 mb-2">5M+</div>
          <div class="text-gray-600 font-medium">Citations partagées</div>
        </div>
        <div>
          <div class="text-4xl font-bold text-emerald-600 mb-2">99.9%</div>
          <div class="text-gray-600 font-medium">Disponibilité</div>
        </div>
        <div>
          <div class="text-4xl font-bold text-amber-600 mb-2">4.9/5</div>
          <div class="text-gray-600 font-medium">Note utilisateurs</div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-center mb-20">
        <h2 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
          Fonctionnalités qui inspirent
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Des outils puissants pour partager et interagir avec des citations inspirantes.
        </p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="group p-8 bg-white/50 backdrop-blur-md rounded-2xl border border-white/50 hover:border-indigo-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white">
          <div class="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors">
            <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Kanban-like Feed</h3>
          <p class="text-gray-600 mb-6 leading-relaxed">Visualisez votre fil d'actualité de citations par date ou popularité avec un défilement fluide.</p>
        </div>
        <!-- Add 5 more features adapted from TaskFlow -->
        <div class="group p-8 bg-white/50 backdrop-blur-md rounded-2xl border border-white/50 hover:border-indigo-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white">
          <div class="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Collaboration Temps Réel</h3>
          <p class="text-gray-600 mb-6 leading-relaxed">Likes et commentaires mis à jour instantanément. Partagez avec votre communauté.</p>
        </div>
        <div class="group p-8 bg-white/50 backdrop-blur-md rounded-2xl border border-white/50 hover:border-indigo-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-white">
          <div class="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors">
            <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Analytics Avancés</h3>
          <p class="text-gray-600 mb-6 leading-relaxed">Suivez les performances de vos citations : likes, partages et engagement.</p>
        </div>
      </div>
    </section>

    <!-- How it Works -->
    <section class="py-24 bg-gradient-to-b from-white to-indigo-50 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Comment ça marche</h2>
        <div class="grid md:grid-cols-3 gap-12 mt-16">
          <div class="text-center">
            <div class="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl font-bold text-indigo-600">1</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Créez votre espace</h3>
            <p class="text-gray-600">Inscrivez-vous et configurez votre profil en quelques secondes.</p>
          </div>
          <div class="text-center">
            <div class="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl font-bold text-purple-600">2</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Publiez vos citations</h3>
            <p class="text-gray-600">Partagez texte, images et tags. Organisez votre contenu.</p>
          </div>
          <div class="text-center">
            <div class="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl font-bold text-emerald-600">3</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Interagissez & analysez</h3>
            <p class="text-gray-600">Obtenez likes, commentaires et insights sur vos publications.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Footer -->
    <section class="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-center">
      <div class="max-w-2xl mx-auto px-4">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">Prêt à partager vos insights ?</h2>
        <p class="text-xl mb-10 opacity-90">Rejoignez 100K+ utilisateurs qui transforment leurs pensées en inspiration.</p>
        <button @click="goToRegister" class="px-12 py-6 bg-white text-indigo-700 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 mx-auto">
          Commencer gratuitement
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
</style>

