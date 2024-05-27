import { Product, Students, Teacher } from "@prisma/client";
import { join } from "path";
import { create } from "zustand";

type order = {
  id: string;
  rowno: number;
  student?: Students;
  teacher?: Teacher;
  product?: Product;
  amount?: number;
  price?: number;
  unit?: string;
};

type orderAction = {
  order: order[];
  updateOrder: (order: order[]) => void;
};

const useOrderStore = create<orderAction>((set) => ({
  order: [],
  updateOrder: (order) => set((state) => ({ order: order })),
}));

export default useOrderStore;
