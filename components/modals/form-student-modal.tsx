"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import FormStudent from "@/app/(pages)/students/_components/form-student";
import useFormStudentModal from "@/hooks/modals/useFormStudentModal";
import { ScrollArea } from "../ui/scroll-area";
import useStudents from "@/hooks/useStudents";

export const FormStudentModal = () => {
  const formModal = useFormStudentModal();
  const { data: students, isLoading, mutate } = useStudents(formModal.id);
  mutate();

  return (
    <Dialog
      open={formModal.isOpen && !isLoading}
      onOpenChange={formModal.onClose}
    >
      <DialogContent className="max-w-[900px] w-[80%] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          <FormStudent initialData={formModal.id ? students : null} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
