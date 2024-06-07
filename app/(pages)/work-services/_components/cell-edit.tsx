"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useOrderData from "@/hooks/useOrderStore";
import { Divide, Minus, Trash, Trash2, X } from "lucide-react";
import { ChangeEvent, ElementRef, useRef, useState } from "react";

interface CellActionProps {
  data: any;
}

export const CellEdit: React.FC<CellActionProps> = ({ data }) => {
  const { order, updateOrder } = useOrderData();
  const [changeValue, setChangeValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
      setChangeValue(data?.amount);
    }, 0);
  };

  const handleChange = () => {
    const change_order = order.find((f) => f.id === data.id);
    if (change_order) {
      const un_change_order = order.filter((f) => f.id !== change_order.id);

      const changed_order = {
        ...change_order,
        amount: parseInt(changeValue === "" ? data?.amount : changeValue),
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

  const onBlur = () => {
    handleChange();
    setIsEditing(false);
  };

  return (
    <>
      {/* <Input
        type="number"
        className="w-20"
        value={changeValue === "" ? data?.amount : changeValue}
        onChange={(e) => {
          setChangeValue(e.target.value);
        }}
        onBlur={handleChange}
        min={1}
      /> */}
      {isEditing ? (
        <Input
          ref={inputRef}
          type="number"
          className="w-20 remove-arrow text-sm py-2 h-7 font-medium border-background hover:border-input  truncate focus:bg-sea-green-50 text-center"
          value={changeValue}
          onChange={(e) => {
            setChangeValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              onBlur();
            }
          }}
          onBlur={onBlur}
          min={1}
          placeholder={data?.amount}
        />
      ) : (
        <div
          onClick={enableEditing}
          className="w-20 text-sm px-2.5 py-1 h-7 font-medium border-transparent text-center cursor-text"
        >
          {data.amount}
        </div>
      )}
    </>
  );
};
