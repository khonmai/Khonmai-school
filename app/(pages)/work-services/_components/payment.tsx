"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/components/ui/use-toast";
import usePaymentModal from "@/hooks/modals/usePaymentModal";
import useReceiptModal from "@/hooks/modals/useReceiptModal";
import useOrderStore from "@/hooks/useOrderStore";
import axios from "axios";
import { CircleDollarSign } from "lucide-react";
import { useSession } from "next-auth/react";
import generatePayload from "promptpay-qr";
import qrcode from "qrcode";

import React, { useEffect, useState } from "react";

function Payment() {
  const { data: session, status } = useSession();
  const { order, updateOrder } = useOrderStore();
  const paymentModal = usePaymentModal();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalPayment, setTotalPayment] = useState(0);
  const [qrcodeurl, setQrcodeurl] = useState("");
  const [recieve, setRecieve] = useState(0);
  const [remark, setRemark] = useState("");

  const receiptModal = useReceiptModal();

  useEffect(() => {
    if (order) {
      setTotalPayment(
        order.reduce((accumulator, object) => {
          return accumulator + (object?.amount ?? 0) * (object?.price ?? 0);
        }, 0)
      );
    }
  }, []);

  const generateQR = (amount = 0) => {
    // @ts-check
    const mobileNumber = "0991738998";
    const IDCardNumber = "0-0000-00000-00-0";
    const payload = generatePayload(mobileNumber, { amount }); //First parameter : mobileNumber || IDCardNumber

    // Convert to SVG QR Code
    qrcode.toDataURL(payload, (err, url) => {
      if (err) return console.log(err);
      setQrcodeurl(url);
    });
  };

  const handlePayment = async () => {
    if (paymentMethod === "cash" && recieve < totalPayment) {
      toast({
        title: "Error",
        variant: "destructive",
        description: `ยอดชำระไม่ครบกำหนด`,
      });
      return;
    }

    if (order) {
      let body = {
        order: order,
        student_id: order[0].student?.id ?? 0,
        teacher_id: order[0].teacher?.id ?? "0",
        is_paid: paymentMethod !== "unpaid",
        payment_method: paymentMethod,
        recieve: paymentMethod === "qrscan" ? totalPayment : recieve ?? 0,
        return: paymentMethod === "qrscan" ? 0 : recieve - totalPayment,
        pay_date: new Date(),
        remark: remark,
      };

      try {
        const order = await axios.post("/api/order", body);
        toast({
          title: "Success",
          variant: "success",
        });

        receiptModal.onOpen(order.data.id);
        paymentModal.onClose();

        updateOrder([]);
      } catch (error: any) {
        toast({
          title: "Error",
          variant: "destructive",
          description: `Error : ${error.message}`,
        });
      }
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="font-semibold text-xl">Payment</h2>
      <Separator className="mt-4" />
      <div className="flex justify-between my-4 text-2xl">
        <p>จำนวนเงินที่ต้องชำระ :</p>
        <p>{totalPayment}</p>
      </div>
      <div>
        ชำระผ่าน
        <ToggleGroup
          type="single"
          className="h-24 flex space-x-2 "
          onValueChange={(value) => {
            setPaymentMethod("");
            if (value) {
              setPaymentMethod(value);
              if (value === "qrscan") {
                generateQR(totalPayment);
              }
            }
          }}
        >
          <ToggleGroupItem
            value="qrscan"
            aria-label="Toggle a"
            className="h-24 "
          >
            <img
              src="images/PromptPay.png"
              className="h-20 w-20 object-contain"
            />
          </ToggleGroupItem>
          <ToggleGroupItem value="cash" aria-label="Toggle b" className="h-24">
            <img src="images/cash.jpg" className="h-20 w-20 object-contain" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="unpaid"
            aria-label="Toggle c"
            className="h-24"
          >
            <img src="images/unpaid.jpg" className="h-20 w-20 object-contain" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        {paymentMethod == "qrscan" && (
          <div className="flex justify-center">
            <img src={qrcodeurl} width={350} />
          </div>
        )}
        {paymentMethod == "cash" && (
          <div className="flex flex-col space-y-1 items-center ">
            <div className="max-w-[250px]">
              <Label>รับเงิน : </Label>
              <Input
                type="number"
                value={recieve}
                onChange={(e) => setRecieve(Number.parseFloat(e.target.value))}
                className="text-right text-2xl"
              />
            </div>
            <div className="max-w-[250px]">
              <Label>เงินทอน : </Label>
              <Input
                readOnly
                value={recieve - totalPayment ?? 0}
                className="text-right text-2xl pr-7"
              />
            </div>
          </div>
        )}
      </div>
      <div className="w-full">
        <Label>หมายเหตุ : </Label>
        <Textarea
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="resize-none"
        />
      </div>
      <div className="pt-6 space-x-2 flex w-full">
        <Button variant="ghost" onClick={paymentModal.onClose}>
          Cancel
        </Button>
        <Button
          variant={"primary"}
          className="w-full"
          onClick={() => {
            handlePayment();
          }}
          disabled={paymentMethod ? false : true}
        >
          <CircleDollarSign className="h-4 w-4 mr-2" />
          Confirm Payment
        </Button>
      </div>
    </div>
  );
}

export default Payment;
