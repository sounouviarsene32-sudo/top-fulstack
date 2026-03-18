import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE = 'http://localhost:5000/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),

  getters: {
    // CORRECTION : On se base surtout sur le token pour l'accès initial
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    async login(credentials) {
      try {
        const response = await axios.post(`${API_BASE}/auth/login`, credentials)
        // Vérifie bien que ton backend renvoie { token, user }
        const { token, user } = response.data
        
        this.token = token
        this.user = user
        localStorage.setItem('token', token)
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        return { success: true }
      } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Erreur de connexion' }
      }
    },

    async register(userData) {
      try {
        const response = await axios.post(`${API_BASE}/auth/register`, userData)
        const { token, user } = response.data
        
        this.token = token
        this.user = user
        localStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        return { success: true }
      } catch (error) {
        return { success: false, message: error.response?.data?.message || "Erreur d'inscription" }
      }
    },

    async getMe() {
      if (!this.token) return
      try {
        // On attache le token pour cette requête précise
        const response = await axios.get(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        // On met à jour l'utilisateur avec les données reçues
        this.user = response.data.user
        // On remet le header par défaut pour la suite
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      } catch (error) {
        console.error("Session expirée ou invalide")
        this.logout()
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  }
})