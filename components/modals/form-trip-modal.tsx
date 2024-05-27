"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import useFormTripModal from "@/hooks/modals/useFormTripModal";
import FormTrip from "@/app/(pages)/trip/_components/form-trip";
import useTrip from "@/hooks/useTrip";

export const FormTripModal = () => {
  const formModal = useFormTripModal();
  const { data: trips, isLoading, mutate } = useTrip(formModal.id);
  mutate();

  return (
    <Dialog
      open={formModal.isOpen && !isLoading}
      onOpenChange={formModal.onClose}
    >
      <DialogContent className="max-w-[900px] w-[80%] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          <FormTrip initialData={formModal.id ? trips : null} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
