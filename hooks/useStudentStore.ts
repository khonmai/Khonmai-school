import { Students } from "@prisma/client";
import { create } from "zustand";

type studentAction = {
  student: Students | null;
  updateStudent: (student: Students | null) => void;
};

const useStudentStore = create<studentAction>((set) => ({
  student: null,
  updateStudent: (student) => set((state) => ({ student: student })),
}));

export default useStudentStore;
