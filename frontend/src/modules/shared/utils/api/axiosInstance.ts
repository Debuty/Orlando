import axios from 'axios';
import { normalizeApiError } from './errorHandler';
import { getAuthToken, syncAuthToken } from './authTokenBridge';
import { getStore } from './storeRef';
import { logout } from '../../../auth/store/authSlice';

/**
 * Shared Axios instance for the whole frontend.
 * Token comes from Redux auth (synced via authTokenBridge).
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(normalizeApiError(error))
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const config = error.config;
    const status = error.response?.status;
    const normalized = normalizeApiError(error);

    if (
      status === 401 &&
      config &&
      !config._retry &&
      !config.skipAuthRedirect
    ) {
      config._retry = true;

      const store = getStore();
      store?.dispatch(logout());
      syncAuthToken(null);

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(normalized);
  }
);

export default api;
