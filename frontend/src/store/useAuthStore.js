import { create } from 'zustand';
import axios from 'axios';


const api = axios.create({
  baseURL:  import.meta.env.MODE === 'development' ? 'http://localhost:3000' : '',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  

  login: async (credentials) => {
    
    set({ loading: true, error: null });
    try {
      const { data } = await api.post(`${baseURL}/auth/login`, credentials);

      // Expect backend to return { token, user }
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      set({
        user: data.user || null, // avoid undefined
        isAuthenticated: !!data.token,
        loading: false,
      });
      console.log("Login Success:", data)
      // if (data.user?.role === 'admin') {
      //   navigate('/dashboard');
      // } else if (data.user?.role === 'volunteer') {
      //   navigate('/dashboard'); // or '/dashboard' if you want
      // } else {
      //   navigate('/');
      // }
      return data;

    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      set({ error: msg, loading: false });
      console.error('login error:', error.message)
    }
  },




  signup: async (userData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post(`${baseURL}auth/signup`, userData);
      localStorage.setItem('token', data.token);
      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });
      return data;
    } catch (error) {
      const msg = error.response?.data?.message || 'Signup failed';
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;