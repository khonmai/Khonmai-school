"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import useStockModal from "@/hooks/modals/useStockModal";
import useOrder from "@/hooks/useOrder";
import { useState } from "react";
import FormStock from "@/app/(pages)/stock/_components/form-stock";

export const StockModal = () => {
  const modal = useStockModal();
  const { data: order, isLoading, mutate } = useOrder(modal.id);
  const { mutate: mutateAll } = useOrder();
  mutate();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={modal.isOpen} onOpenChange={modal.onClose}>
      <DialogContent className="max-w-[900px] w-[80%] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          <FormStock  />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
