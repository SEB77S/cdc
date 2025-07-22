import axios from 'axios';
import useAuthStore from '../store/useAuthStore'; // Importá tu store

const api = axios.create({
  baseURL: import.meta.env.VITE_CDC_URL,
});

// Interceptor para añadir el token de Zustand automáticamente
api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState(); // accede sin hook
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
