import { create } from 'zustand';

const useUserStore = create((set) => ({
  userId: localStorage.getItem('user_id') || null,
  token: localStorage.getItem('access_token') || null,

  setAuth: ({ userId, token }) => {
    set({ userId, token });
  },

  clearAuth: () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('access_token');
    set({ userId: null, token: null });
  }
}));

export default useUserStore;