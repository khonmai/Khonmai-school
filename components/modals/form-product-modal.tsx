"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import useFormProductModal from "@/hooks/modals/useFormProductModal";
import FormProduct from "@/app/(pages)/product/_components/form-product";
import useProducts from "@/hooks/useProducts";

export const FormProductModal = () => {
  const formModal = useFormProductModal();
  const { data: trips, isLoading, mutate } = useProducts(formModal.id);
  mutate();

  return (
    <Dialog
      open={formModal.isOpen && !isLoading}
      onOpenChange={formModal.onClose}
    >
      <DialogContent className="max-w-[900px] w-[80%] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          <FormProduct initialData={formModal.id ? trips : null} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
