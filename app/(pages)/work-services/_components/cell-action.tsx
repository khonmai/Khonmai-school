"use client";

import { Button } from "@/components/ui/button";
import useOrderData from "@/hooks/useOrderStore";
import { Divide, Minus, Trash, Trash2, X } from "lucide-react";

interface CellActionProps {
  data: any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { order, updateOrder } = useOrderData();

  const handleRemove = () => {
    const change_order = order.find((f) => f.id === data.id);
    if (change_order) {
      const un_change_order = order.filter((f) => f.id !== change_order.id);

      const changed_order = {
        ...change_order,
        amount: (change_order?.amount ?? 0) - 1,
      };

      if (changed_order.amount == 0) {
        const data = [...un_change_order];
        updateOrder(data);
      } else {
        const data = [...un_change_order, changed_order];
        updateOrder(data);
      }
    } else {
      updateOrder([]);
    }
  };

  return (
    <Button
      onClick={handleRemove}
      variant={"ghost"}
      size={"iconsm"}
      className="hover:bg-destructive/70 hover:text-sea-green-50 hover:font-bold"
    >
      <Minus className="w-4 h-4" />
    </Button>
  );
};
