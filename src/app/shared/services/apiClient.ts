import { getToken, logout } from "./authService";

 
export const API_BASE_URL = 'https://api.consorciosestudio3.com.ar';
// export const API_BASE_URL = 'http://127.0.0.1:5000';

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
        const error = new Error(errorData.error || 'Error en la petición');
        
        (error as any).data = errorData; 
        (error as any).status = response.status;
        
        throw error;
    }

    return response.json();
}

// Helpers para métodos comunes
export const api = {
    get: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'GET' }),
    delete: <T>(endpoint: string) => apiRequest<T>(endpoint, { method: 'DELETE' }),
    post: <T>(endpoint: string, body: any) => apiRequest<T>(endpoint, { 
        method: 'POST', 
        body: JSON.stringify(body) 
    }),
    put: <T>(endpoint: string, body: any) => apiRequest<T>(endpoint, { 
        method: 'PUT', 
        body: JSON.stringify(body) 
    }),
    patch: <T>(endpoint: string, body: any) => apiRequest<T>(endpoint, { 
        method: 'PATCH', 
        body: JSON.stringify(body) 
    }),
};

export const verifySession = async (): Promise<void> => {
    const token = getToken();
    const isAtLogin = window.location.pathname === '/login';

    // 1. Si no hay token
    if (!token) {
        if (!isAtLogin) {
            logout();
            window.location.href = '/login';
        }
        return; // Si no hay token y ya está en login, no hacemos nada
    }

    try {
        const response = await fetch(`${API_BASE_URL}/check_token`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        // 2. Si el token es INVÁLIDO
        if (!response.ok || data.success === false) {
            console.warn("Sesión inválida:", data.msg);
            logout();
            // Solo redirigir a login si no estamos ya allí
            if (!isAtLogin) {
                window.location.href = '/login';
            }
        } 
        // 3. Si el token es VÁLIDO
        else {
            console.log("Sesión verificada correctamente");
            
            // SI ESTÁ EN LOGIN -> Redirigir al inicio (Dashboard/Home)
            if (isAtLogin) {
                console.log("Token válido detectado en login, redirigiendo...");
                window.location.href = '/employees'; 
            }
        }
        
    } catch (error) {
        console.error("Error verificando sesión:", error);
        // En caso de error de red, si no estamos en login, 
        // decidimos si ser estrictos o dejarlo pasar.
        // Por seguridad, si el servidor no responde, mejor limpiar.
        if (!isAtLogin) {
            logout();
            window.location.href = '/login';
        }
    }
};