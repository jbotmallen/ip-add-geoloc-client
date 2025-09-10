import axios from 'axios';

const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:8000' : import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        if (error.response?.status === 500) {
            console.error("Server error:", error.response.data);
            return Promise.resolve({ data: null, message: "Server error" });
        }
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.location.href = '/login';
        } else if (error.response?.status === 500) {
            console.error("Server error:", error.response.data);
            return Promise.resolve({ data: null, message: "Server error" });
        }
        return Promise.reject(error);
    }
);

export default api;