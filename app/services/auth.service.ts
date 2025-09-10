// services/auth.service.ts
import api from './api';

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
}

export interface User {
    id: string;
    email: string;
}

export interface AuthResponse {
    success: boolean;
    token?: string;
    data?: User;
    message?: string;
}

class AuthService {
    async login(data: LoginData): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/api/auth/login', data);
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        
        return response.data;
    }

    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/api/auth/register', data);
        return response.data;
    }

    async logout(): Promise<void> {
        try {
            await api.post('/api/auth/logout');
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
        } catch (error) {
            console.log('Logout failed', error);
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
        }
    }

    async getSession(): Promise<AuthResponse> {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        
        const response = await api.get<AuthResponse>('/api/auth/');
        console.log('getSession response:', response.data);
        return response.data;
    }

    async getMe(): Promise<AuthResponse> {
        const response = await api.get<AuthResponse>('/api/auth/me');
        return response.data;
    }
}

export default new AuthService();