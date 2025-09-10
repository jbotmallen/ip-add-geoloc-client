import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import authService, { type User } from '@/services/auth.service';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name?: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const checkAuth = async () => {
        setLoading(true);
        try {
            const response = await authService.getSession();
            if (response.success && response.data) {
                setUser(response.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();

        checkAuth().catch((error) => {
            if (error.name !== 'AbortError') {
                console.log('Failed to check auth:', error);
            }
        });
        return () => controller.abort();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await authService.login({ email, password });
            if (response.success) {
                await checkAuth();
                toast.success('Login successful!');
                navigate('/', { replace: true });
            } else {
                toast.error(response.message || 'Login failed');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || 'Login failed';
            toast.error(message);
            throw error;
        }
    };

    const register = async (email: string, password: string, name?: string) => {
        try {
            const response = await authService.register({ email, password });
            if (response.success) {
                await checkAuth();
                toast.success('Registration successful!');
                navigate('/', { replace: true });
            } else {
                toast.error(response.message || 'Registration failed');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || 'Registration failed';
            toast.error(message);
            throw error;
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await authService.logout();
            setUser(null);
            toast.success('Logged out successfully');
            navigate('/login', { replace: true });
        } catch (error) {
            toast.error('Logout failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                checkAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};