import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user.js' // Import indispensable pour la sécurité

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { title: 'Accueil - Citation Insights' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { guestOnly: true } // Optionnel : pour empêcher un connecté d'aller sur login
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      // meta: { guestOnly: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true } // Marqueur pour protéger la route
    },
    {
      path: '/quotes/:id',
      name: 'quote-details',
      component: () => import('../views/QuoteDetailsView.vue')
    }
  ]
})

// --- LE "NAVIGUARD" (SÉCURITÉ) ---
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // 1. Si la route demande une authentification et que l'utilisateur n'est pas connecté
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    // On le renvoie vers la page de connexion
    next({ name: 'login' })
  } 
  // 2. Si l'utilisateur est déjà connecté et essaie d'aller sur Login/Register
  else if (to.meta.guestOnly && userStore.isAuthenticated) {
    next({ name: 'home' })
  } 
  // 3. Sinon, on laisse passer
  else {
    next()
  }
})

// Changer le titre de l'onglet automatiquement
router.afterEach((to) => {
  document.title = to.meta.title || 'Citation Insights'
})

export default router