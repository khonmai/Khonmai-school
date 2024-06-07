import { create } from "zustand";

interface useIsLoadingStore {
  isLoading: boolean;
  onLoading: (id?: string) => void;
  onLoaded: () => void;
}

const useIsLoading = create<useIsLoadingStore>((set) => ({
  isLoading: false,
  onLoading: (id) => set({ isLoading: true }),
  onLoaded: () => set({ isLoading: false }),
}));

export default useIsLoading;
