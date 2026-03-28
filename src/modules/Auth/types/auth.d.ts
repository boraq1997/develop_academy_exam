/**
 * src/modules/Auth/types/auth.d.ts
 * Defines types specific to the authentication module.
 */

import { User } from "@/types/api";

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}
