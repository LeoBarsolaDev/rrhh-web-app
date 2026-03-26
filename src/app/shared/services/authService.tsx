import type { AuthResponse } from "../types/authTypes";


const API_BASE_URL: string = 'http://127.0.0.1:5000';
const TOKEN_KEY: string = 'accessToken';

export const setAuthData = (token: string, role: string[], userId: number): void => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem('userRole', role.toString());
    localStorage.setItem('userId', userId.toString());
};

export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const logout = (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
};
