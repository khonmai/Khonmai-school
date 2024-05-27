import { create } from "zustand";

interface FormTripModalStore {
  isOpen: boolean;
  onOpen: (id?: string) => void;
  onClose: () => void;
  id?: string;
}

const useFormTripModal = create<FormTripModalStore>((set) => ({
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, id: id }),
  onClose: () => set({ isOpen: false }),
}));

export default useFormTripModal;
