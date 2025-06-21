import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  timeout: 30000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const accessToken = Cookies.get('accessToken') || sessionStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear tokens
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');

      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    if (error.response?.status === 403) {
      // Handle forbidden access
      console.error('Access forbidden:', error.response.data);
    }

    if (error.response?.status >= 500) {
      // Handle server errors
      console.error('Server error:', error.response.data);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const swrConfig = {
  errorRetryCount: 2,
  errorRetryInterval: 10000,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
};

// Fetcher function for SWR
export const fetcher = async (url: string) => {
  const response = await axiosInstance.get(url);
  return response.data;
};

// Endpoints
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
    refresh: '/auth/refresh',
  },
  user: {
    list: '/users',
    details: (id: string) => `/users/${id}`,
    create: '/users',
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
  },
  question: {
    list: '/questions',
    create: '/questions',
    update: (id: string) => `/questions/${id}`,
  },
  teses: {
    list: '/claims',
    details: (id: string) => `/claims/${id}`,
    create: '/claims',
    update: (id: string) => `/claims/${id}`,
  },
  diagnosticos: {
    list: '/diagnoses',
    create: '/diagnoses',
    detail: (id: string) => `/diagnoses/${id}`,
    delete: (id: string) => `/diagnoses/${id}`,
    recommendations: (id: string) => `/diagnoses/${id}/recommendations`,
  },
  taxTypes: {
    list: '/tax-types',
    create: '/tax-types',
    update: (id: string) => `/tax-types/${id}`,
  },
};
