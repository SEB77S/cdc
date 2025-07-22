import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCRMStore = create(
  persist(
    (set, /* get */) => ({
      option: null,

      setOption: (option) => set({ option }),

    }),
    {
      name: 'admin-storage'
    }
  )
);
export default useCRMStore;