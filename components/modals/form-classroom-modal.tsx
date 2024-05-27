"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import useFormClassRoomModal from "@/hooks/modals/useFormClassRoomModal";
import FormClassRoom from "@/app/(pages)/classroom/_components/form-classroom";
import useClassRoom from "@/hooks/useClassRoom";

export const FormClassRoomModal = () => {
  const formModal = useFormClassRoomModal();
  const { data: classrooms, isLoading, mutate } = useClassRoom(formModal.id);
  mutate();

  return (
    <Dialog
      open={formModal.isOpen && !isLoading}
      onOpenChange={formModal.onClose}
    >
      <DialogContent className="max-w-[900px] w-[80%] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          <FormClassRoom initialData={formModal.id ? classrooms : null} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
