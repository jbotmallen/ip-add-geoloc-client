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
        try {
            const response = await api.post<AuthResponse>('/api/auth/login', data);
            return response.data;
        } catch (error) {
            return { success: false, message: 'Login failed' };
        }
    }

    async register(data: RegisterData): Promise<AuthResponse> {
        try {
            const response = await api.post<AuthResponse>('/api/auth/register', data);
            return response.data;
        } catch (error) {
            return { success: false, message: 'Registration failed' };
        }
    }

    async logout(): Promise<void> {
        try {
            await api.post('/api/auth/logout');
        } catch (error) {
            console.log('Logout failed', error);
        }
    }

    async getSession(): Promise<AuthResponse> {
        try {
            const response = await api.get<AuthResponse>('/api/auth/');
            console.log('getSession response:', response.data);
            return response.data;
        } catch (error) {
            return { success: false, message: 'Failed to fetch session' };
        }
    }

    async getMe(): Promise<AuthResponse> {
        
        try {
            const response = await api.get<AuthResponse>('/api/auth/me');
            return response.data;
        } catch (error) {
            return { success: false, message: 'Failed to fetch user data' };
        }
    }
}

export default new AuthService();