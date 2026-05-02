import axios from 'axios';

// Use mock mode if backend is not available
// Set to true so the app is navigable when there is no backend running.
const USE_MOCK = true; 

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
            // Provide intelligent mock responses so the frontend can still be navigated without a real backend
            const url = error.config?.url;
            
            if (url?.includes('/auth/login') || url?.includes('/auth/signup')) {
                // Return a mock user and token so login succeeds
                let mockData = {};
                try {
                    mockData = JSON.parse(error.config.data || '{}');
                } catch(e) {}
                
                return Promise.resolve({ 
                    data: {
                        token: 'mock-jwt-token-12345',
                        user: {
                            id: 1,
                            name: mockData.name || mockData.email?.split('@')[0] || 'Mock User',
                            email: mockData.email || 'test@example.com'
                        }
                    } 
                });
            }
            
            if (url?.includes('/courses')) {
                // Return empty courses or reviews
                return Promise.resolve({ data: [] });
            }

            // Fallback for any other request
            return Promise.resolve({ data: {} });
        }
        return Promise.reject(error);
    }
);

export default api;