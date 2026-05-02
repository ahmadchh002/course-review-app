import axios from 'axios';

// Use mock mode if backend is not available
const USE_MOCK = true; // Set to false when backend is ready

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 5000, // 5 second timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && !USE_MOCK) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (USE_MOCK) {
            // Don't show errors in mock mode
            return Promise.resolve({ data: [] });
        }
        return Promise.reject(error);
    }
);

export default api;