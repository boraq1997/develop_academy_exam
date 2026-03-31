/**
 * src/modules/Auth/store/auth.store.ts
 * Pinia store for authentication state management.
 * ✅ Fixed: unified token key, correct error property, proper logout flow
 */

import { defineStore } from 'pinia'
import { AuthService } from '../../../services/auth.service'
import type { User } from '../../../types/api'

// ✅ مفتاح واحد موحّد للتوكن
const TOKEN_KEY = 'sanctum_token'

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null  // ✅ كان authError في بعض الأماكن - موحّد الآن
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem(TOKEN_KEY),
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state): boolean => !!state.token && !!state.user,
    authError: (state): string | null => state.error, // ✅ alias للتوافق
  },

  actions: {
    // 🔐 Login
    async login(credentials: { email: string; password: string }): Promise<void> {
      this.loading = true
      this.error = null

      try {
        const response = await AuthService.login(credentials)

        this.token = response.token
        localStorage.setItem(TOKEN_KEY, response.token)

        // ✅ تعيين المستخدم مباشرة من استجابة الـ login إن وُجد
        if (response.user) {
          this.user = response.user
        } else {
          await this.fetchUser()
        }
      } catch (err: any) {
        this.error = err?.response?.data?.message || err?.message || 'فشل تسجيل الدخول'
        throw err
      } finally {
        this.loading = false
      }
    },

    // 👤 جلب بيانات المستخدم من الباك إند
    async fetchUser(): Promise<void> {
      if (!this.token) {
        this.logout()
        return
      }

      this.loading = true

      try {
        const user = await AuthService.getUser()
        this.user = user
      } catch {
        this.logout()
      } finally {
        this.loading = false
      }
    },

    // 🚀 تهيئة عند فتح التطبيق
    async initializeAuth(): Promise<void> {
      if (!this.token) return
      await this.fetchUser()
    },

    // 🚪 Logout - ✅ مزامنة مع الباك إند
    async logout(): Promise<void> {
      try {
        if (this.token) {
          await AuthService.logout()
        }
      } catch {
        // تجاهل أخطاء الـ logout من الباك إند
      } finally {
        this.user = null
        this.token = null
        this.error = null
        localStorage.removeItem(TOKEN_KEY)
      }
    },

    clearError(): void {
      this.error = null
    },
  },
})