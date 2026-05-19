import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  // Pastikan file .env menggunakan VITE_API_BASE_URL
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;