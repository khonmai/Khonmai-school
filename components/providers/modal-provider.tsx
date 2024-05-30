"use client";

import { useEffect, useState } from "react";
import { LoginModal } from "@/components/modals/login-modal";
import { FormStudentModal } from "../modals/form-student-modal";
import { FormTeacherModal } from "../modals/form-teacher-modal";
import { FormClassRoomModal } from "../modals/form-classroom-modal";
import { FormTripModal } from "../modals/form-trip-modal";
import { FormProductModal } from "../modals/form-product-modal";
import { FormCategoryModal } from "../modals/form-category-modal";
import { PaymentModal } from "../modals/payment-modal";
import { ReceiptModal } from "../modals/receipt-modal";
import { StockModal } from "../modals/stock-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <LoginModal />
      <FormStudentModal />
      <FormTeacherModal />
      <FormClassRoomModal />
      <FormTripModal />
      <FormProductModal />
      <FormCategoryModal />
      <PaymentModal />
      <ReceiptModal />
      <StockModal />
    </>
  );
};
