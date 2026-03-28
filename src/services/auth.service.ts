/**
 * src/service/auth.service.ts
 * Service for handling authentication-related API calls with Laravel Sanctum.
 */

import api from './api';
import type { ApiResponse, LoginResponse, User } from '@/types/api'; // Adjust path as needed

export class AuthService {
    /**
     * Attempts to log in a user.
     * @param credentials - User's email and password.
     * @returns A promise that resolves with the login response data.
     */
    static async login(credentials: Record<string, string>): Promise<LoginResponse> {
        const response = await api.post<ApiResponse<LoginResponse>>('/login', credentials);
        const loginData = response.data.data;
        if (loginData.token) {
            localStorage.setItem('sanctum_token', loginData.token);
        }
        return loginData;
    }

    /**
     * Logs out the currently authenticated user.
     * @returns A promise that resolves when the logout is successful.
     */
    static async logout(): Promise<void> {
        await api.post<ApiResponse<any>>('/logout');
        localStorage.removeItem('sanctum_token');
    }

    /**
     * Fetches the currently authenticated user's data.
     * @returns A promise that resolves with the user data.
     */
    static async getUser(): Promise<User> {
        const response = await api.get<ApiResponse<User>>('/user');
        return response.data.data;
    }

    /**
     * Checks if the user is currently authenticated by checking for a token.
     * Note: This only checks for the presence of a token, not its validity.
     * For full validity, a call to getUser() is recommended.
     * @returns boolean - true if a token exists, false otherwise.
     */
    static isAuthenticated(): boolean {
        return !!localStorage.getItem('sanctum_token');
    }
}
