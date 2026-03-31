/**
 * src/services/api.ts
 * ✅ Fixed: unified token key matches auth.store.ts
 */

import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import type { ApiResponse } from '../types/api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

// ✅ مفتاح واحد موحّد — يجب أن يتطابق مع auth.store.ts
const TOKEN_KEY = 'sanctum_token'

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// ─── Request Interceptor ─────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ─── Response Interceptor ────────────────────────────────
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => response,
  (error: AxiosError<ApiResponse>) => {
    if (error.response) {
      const { status, data } = error.response

      if (status === 401) {
        // ✅ مسح التوكن وإعادة التوجيه للـ Login
        localStorage.removeItem(TOKEN_KEY)
        // تجنب circular import مع router — نستخدم window.location
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      } else if (status === 403) {
        console.error('Forbidden: You do not have permission.', data?.message)
      } else if (status === 422) {
        console.error('Validation Error:', data?.errors)
      } else {
        console.error(`API Error ${status}:`, data?.message || error.message)
      }
    } else if (error.request) {
      console.error('No response received:', error.request)
    } else {
      console.error('Request setup error:', error.message)
    }

    return Promise.reject(error)
  }
)

export default api