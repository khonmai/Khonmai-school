"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import useReceiptModal from "@/hooks/modals/useReceiptModal";
import { Receipt } from "@/app/(pages)/work-services/_components/receipt";
import useOrder from "@/hooks/useOrder";
import { PDFViewer } from "@react-pdf/renderer";

export const ReceiptModal = () => {
  const modal = useReceiptModal();
  const { data: order, isLoading, mutate } = useOrder(modal.id);
  mutate();

  return (
    <Dialog
      open={modal.isOpen && !isLoading && !!modal.id}
      onOpenChange={modal.onClose}
    >
      <DialogContent className="max-w-[900px] w-[80%] h-[90%] p-0 overflow-hidden">
        <div>
          <div className="w-full mx-auto px-6 py-2">
            <h2 className="font-semibold text-xl">Payment</h2>
          </div>
          <PDFViewer className="w-full h-full" showToolbar >
            <Receipt orderData={modal.id ? order : null} />
          </PDFViewer>
        </div>
      </DialogContent>
    </Dialog>
  );
};
