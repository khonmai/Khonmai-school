import { create } from "zustand";

interface FormTeacherModalStore {
  isOpen: boolean;
  onOpen: (id?: string) => void;
  onClose: () => void;
  id?: string;
}

const useFormTeacherModal = create<FormTeacherModalStore>((set) => ({
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, id: id }),
  onClose: () => set({ isOpen: false }),
}));

export default useFormTeacherModal;
