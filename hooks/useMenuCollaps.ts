import { create } from "zustand";

interface MenuCollapsStore {
  isCollapsed: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useMenuCollaps = create<MenuCollapsStore>((set) => ({
  isCollapsed: false,
  onOpen: () => set({ isCollapsed: true }),
  onClose: () => set({ isCollapsed: false }),
}));

export default useMenuCollaps;
