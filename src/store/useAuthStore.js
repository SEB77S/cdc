import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      userId: null,
      setAuth: ({ token, userId }) => set({ token, userId }),
      logout: () => set({ token: null, userId: null }),
    }),
    {
      name: "auth-storage", // usa localStorage
      partialize: (state) => ({ token: state.token, userId: state.userId }),
    }
  )
);

export default useAuthStore;