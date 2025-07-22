import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAppStore = create(
  persist(
    (set, get) => ({
      isSidebarCollapsed: false,
      theme: 'light',
      user: null,
      authToken: null,
      module: 'Home',

      setModule:(module) => set ({module}),
      toggleSidebar: () => set({ isSidebarCollapsed: !get().isSidebarCollapsed }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'admin-storage', // clave de localStorage
    }
  )
);
export default useAppStore;