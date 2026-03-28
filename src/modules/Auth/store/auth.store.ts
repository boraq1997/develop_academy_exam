import { defineStore } from 'pinia'
import {AuthService} from '../../../services/auth.service'

interface User {
  id: number
  name: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('auth_token'),
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user,
  },

  actions: {
    // 🔐 Login
    async login(credentials: { email: string; password: string }) {
      this.loading = true
      this.error = null

      try {
        const response = await AuthService.login(credentials)

        this.token = response.token
        localStorage.setItem('auth_token', response.token)

        await this.fetchUser()
      } catch (err: any) {
        this.error = err?.message || 'Login failed'
        throw err
      } finally {
        this.loading = false
      }
    },

    // 👤 Fetch user (التحقق الحقيقي من السيرفر)
    async fetchUser() {
      if (!this.token) {
        await this.logout()
        return
      }

      this.loading = true

      try {
        const user = await AuthService.getUser()
        this.user = user
      } catch (err) {
        await this.logout()
      } finally {
        this.loading = false
      }
    },

    // 🚀 تهيئة النظام عند فتح التطبيق
    async initializeAuth() {
      if (!this.token) {
        await this.logout()
        return
      }

      try {
        await this.fetchUser()
      } catch {
        await this.logout()
      }
    },

    // 🚪 Logout
    async logout() {
      this.user = null
      this.token = null
      this.error = null

      localStorage.removeItem('auth_token')
    },
  },
})