/**
 * src/composables/useApi.ts
 * A Vue Composable for handling API requests with loading and error states.
 */

import { ref, Ref } from 'vue';
import api from '@/service/api'; // Adjust path as needed
import type { ApiResponse, PaginatedApiResponse } from '@/types/api'; // Adjust path as needed

interface UseApiOptions {
    initialLoading?: boolean;
    initialData?: any;
}

interface UseApiResult<T> {
    data: Ref<T | null>;
    loading: Ref<boolean>;
    error: Ref<string | null>;
    fetchData: (...args: any[]) => Promise<T | null>;
}

export function useApi<T = any>(url: string, options?: UseApiOptions): UseApiResult<T> {
    const data: Ref<T | null> = ref(options?.initialData || null);
    const loading = ref(options?.initialLoading || false);
    const error: Ref<string | null> = ref(null);

    const fetchData = async (...args: any[]): Promise<T | null> => {
        loading.value = true;
        error.value = null;
        try {
            const response = await api.get<ApiResponse<T>>(url, ...args);
            data.value = response.data.data; // Assuming Laravel API returns data in a 'data' property
            return data.value;
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                error.value = err.response.data.message;
            } else if (err.message) {
                error.value = err.message;
            } else {
                error.value = 'An unknown error occurred.';
            }
            return null;
        } finally {
            loading.value = false;
        }
    };

    return {
        data,
        loading,
        error,
        fetchData,
    };
}

// A more generic composable for POST, PUT, DELETE operations
interface UseMutationOptions {
    initialLoading?: boolean;
}

interface UseMutationResult<T, V> {
    data: Ref<T | null>;
    loading: Ref<boolean>;
    error: Ref<string | null>;
    execute: (payload: V) => Promise<T | null>;
}

export function useMutation<T = any, V = any>(method: 'post' | 'put' | 'patch' | 'delete', url: string, options?: UseMutationOptions): UseMutationResult<T, V> {
    const data: Ref<T | null> = ref(null);
    const loading = ref(options?.initialLoading || false);
    const error: Ref<string | null> = ref(null);

    const execute = async (payload: V): Promise<T | null> => {
        loading.value = true;
        error.value = null;
        try {
            let response;
            if (method === 'delete') {
                response = await api[method]<ApiResponse<T>>(url, { data: payload }); // For DELETE with body
            } else {
                response = await api[method]<ApiResponse<T>>(url, payload);
            }
            data.value = response.data.data; // Assuming Laravel API returns data in a 'data' property
            return data.value;
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                error.value = err.response.data.message;
            } else if (err.message) {
                error.value = err.message;
            } else {
                error.value = 'An unknown error occurred.';
            }
            return null;
        } finally {
            loading.value = false;
        }
    };

    return {
        data,
        loading,
        error,
        execute,
    };
}
