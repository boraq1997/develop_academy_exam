/**
 * src/service/api.ts
 * Centralized Axios instance for API communication with Laravel Sanctum.
 */

import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import type { ApiResponse } from '../types/api'; // Corrected path

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Required for Laravel Sanctum to send/receive cookies
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Add Authorization header if token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sanctum_token'); // Or wherever you store your token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors (e.g., 401 Unauthorized, 403 Forbidden)
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // You can add global success handling here if needed
    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401: // Unauthorized
          // Redirect to login page or refresh token
          console.error('Unauthorized: Please log in.', data.message);
          // Example: router.push('/login');
          break;
        case 403: // Forbidden
          console.error('Forbidden: You do not have permission.', data.message);
          // Example: router.push('/403');
          break;
        case 422: // Validation Errors
          console.error('Validation Error:', data.errors);
          break;
        default:
          console.error(`API Error ${status}:`, data.message || error.message);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
