"use client";

import usePaymentModal from "@/hooks/modals/usePaymentModal";
import { Dialog, DialogContent } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import Payment from "@/app/(pages)/work-services/_components/payment";

export const PaymentModal = () => {
  const formModal = usePaymentModal();

  return (
    <Dialog open={formModal.isOpen} onOpenChange={formModal.onClose}>
      <DialogContent className="max-w-[900px] w-[80%] p-0 overflow-hidden">
        <ScrollArea className="max-h-[90vh]">
          <Payment />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
