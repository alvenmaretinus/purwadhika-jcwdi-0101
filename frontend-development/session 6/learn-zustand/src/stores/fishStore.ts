import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type FishState = {
  fishes: number;
  addAFish: () => void;
}

export const useFishStore = create(
  persist<FishState>(
    (set) => ({
      fishes: 0,
      addAFish: () => set((state) => ({ fishes: state.fishes + 1 })),
    }),
    {
      name: 'fish-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)