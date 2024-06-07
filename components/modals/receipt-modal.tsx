"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import useReceiptModal from "@/hooks/modals/useReceiptModal";
import { Receipt } from "@/app/(pages)/work-services/_components/receipt";
import useOrder from "@/hooks/useOrder";
import { PDFViewer } from "@react-pdf/renderer";
import { Button } from "../ui/button";
import { AlertModal } from "./alert-modal";
import { useState } from "react";
import axios from "axios";
import { toast } from "../ui/use-toast";

export const ReceiptModal = () => {
  const modal = useReceiptModal();
  const { data: order, isLoading, mutate } = useOrder(modal.id);
  const { mutate: mutateAll } = useOrder();
  mutate();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirmPaid = async () => {
    const body = {
      is_paid: true,
    };

    try {
      const order = await axios.post(`/api/order/${modal.id}`, body);
      toast({
        title: "Success",
        variant: "success",
      });

      mutateAll();
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: `Error : ${error.response.data}`,
      });
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirmPaid}
        loading={loading}
      />
      <Dialog
        open={modal.isOpen && !isLoading && !!modal.id}
        onOpenChange={modal.onClose}
      >
        <DialogContent className="max-w-[900px] w-[80%] h-[90%] p-0 overflow-hidden">
          <div>
            <div className="w-full mx-auto px-6 py-2">
              <h2 className="font-semibold text-xl">Payment</h2>
            </div>
            <PDFViewer className="w-full h-full" showToolbar>
              <Receipt orderData={modal.id ? order : null} />
            </PDFViewer>
          </div>
          {!order?.is_paid && (
            <div className="absolute w-full flex justify-center bottom-3">
              <Button variant={"primary"} onClick={() => setOpen(true)}>
                ยืนยันชำระเงิน
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
