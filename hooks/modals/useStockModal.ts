import { create } from "zustand";

interface useStockModalStore {
  isOpen: boolean;
  onOpen: (id?: string) => void;
  onClose: () => void;
  id?: string;
}

const useStockModal = create<useStockModalStore>((set) => ({
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, id: id }),
  onClose: () => set({ isOpen: false }),
}));

export default useStockModal;
