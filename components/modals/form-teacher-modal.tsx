"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import useFormTeacherModal from "@/hooks/modals/useFormTeacherModal";
import FormTeacher from "@/app/(pages)/teachers/_components/form-teacher";
import useTeachers from "@/hooks/useTeachers";

export const FormTeacherModal = () => {
  const formModal = useFormTeacherModal();

  const { data: teacher, isLoading, mutate } = useTeachers(formModal.id);
  mutate();

  return (
    <Dialog
      open={formModal.isOpen && !isLoading}
      onOpenChange={formModal.onClose}
    >
      <DialogContent className="max-w-[900px] w-[80%] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          <FormTeacher initialData={formModal.id ? teacher : null} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
