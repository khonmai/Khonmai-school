"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import FormCategory from "@/app/(pages)/category/_components/form-category";
import useCategory from "@/hooks/useCategory";
import useFormCategoryModal from "@/hooks/modals/useFormCategoryModal";

export const FormCategoryModal = () => {
  const formModal = useFormCategoryModal();
  const { data: category, isLoading, mutate } = useCategory(formModal.id);
  mutate();

  return (
    <Dialog
      open={formModal.isOpen && !isLoading}
      onOpenChange={formModal.onClose}
    >
      <DialogContent className="max-w-[900px] w-[80%] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          <FormCategory initialData={formModal.id ? category : null} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
