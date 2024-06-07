"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import FormPassword from "@/app/(pages)/teachers/_components/form-password";
import useFormChangePasswordModal from "@/hooks/modals/useFormChangePassword";

export const FormChangePasswordModal = () => {
  const formModal = useFormChangePasswordModal();

  return (
    <Dialog open={formModal.isOpen} onOpenChange={formModal.onClose}>
      <DialogContent className="max-w-[450px] md:w-[50%] sm:w-[90%] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          <FormPassword />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
