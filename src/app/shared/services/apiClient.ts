import { getToken } from "./authService";

 
const API_BASE_URL = 'http://127.0.0.1:5000';

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = getToken();

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers, // Permite sobrescribir headers si es necesario
    };

    const config: RequestInit = {
        ...options,
        headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        // 1. Intentamos leer el JSON del error
        const errorData = await response.json().catch(() => ({}));

        // 2. Creamos un objeto de error que mantenga la estructura de la API
        // Esto permite que useLogin lea error.response.data.error.message
        const customError: any = new Error(errorData.error?.message || 'Error en la petición');
        customError.response = { data: errorData }; // Simulamos la estructura de Axios
        
        throw customError;
    }

    return response.json();

    return response.json();
}

// Helpers para métodos comunes
export const api = {
    get: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'GET' }),
    post: <T>(endpoint: string, body: any) => apiRequest<T>(endpoint, { 
        method: 'POST', 
        body: JSON.stringify(body) 
    }),
    put: <T>(endpoint: string, body: any) => apiRequest<T>(endpoint, { 
        method: 'PUT', 
        body: JSON.stringify(body) 
    }),
    delete: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'DELETE' }),
};