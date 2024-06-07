import { create } from "zustand";

interface FormChangePasswordModalStore {
  isOpen: boolean;
  onOpen: (id?: string) => void;
  onClose: () => void;
  id?: string;
}

const useFormChangePasswordModal = create<FormChangePasswordModalStore>((set) => ({
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, id: id }),
  onClose: () => set({ isOpen: false }),
}));

export default useFormChangePasswordModal;
