import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/lib/api/axios';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
  isLoadingUser: boolean;
  
  setAuth: (token: string) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      accessToken: null,
      user: null,
      isLoadingUser: false,

      setAuth: (token: string) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        set({ isAuthenticated: true, accessToken: token });
      },

      logout: () => {
        delete api.defaults.headers.common['Authorization'];
        set({ isAuthenticated: false, accessToken: null, user: null });
      },

      fetchUser: async () => {
        const { accessToken } = get();
        if (!accessToken) return;

        set({ isLoadingUser: true });
        
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          const response = await api.get('/auth/me');
          
          set({ user: response.data.data, isLoadingUser: false });
        } catch (error) {
          get().logout();
          set({ isLoadingUser: false });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated, 
        accessToken: state.accessToken 
      }),
    }
  )
);