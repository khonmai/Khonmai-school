import { create } from "zustand";

interface useFormCategoryModalStore {
  isOpen: boolean;
  onOpen: (id?: string) => void;
  onClose: () => void;
  id?: string;
}

const useFormCategoryModal = create<useFormCategoryModalStore>((set) => ({
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, id: id }),
  onClose: () => set({ isOpen: false }),
}));

export default useFormCategoryModal;
