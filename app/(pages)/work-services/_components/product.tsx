"use client";

import React, { useState } from "react";

import { Product as ProductType } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useOrderStore from "@/hooks/useOrderStore";
import { v4 as uuidv4 } from "uuid";
import useStudentStore from "@/hooks/useStudentStore";

interface ProductProps {
  data: ProductType[] | [];
}

function Product({ data }: ProductProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const formatedData: Product[] = data?.map((item: any) => ({
    id: item.id,
    product_no: item.product_no,
    name: item.name,
    price: item.price,
    unit: item.unit,
  }));

  return (
    <div className="w-full items-center">
      <DataTable columns={columns} data={formatedData} perPage={5} />
    </div>
  );
}

export default Product;

interface CellActionProps {
  data: any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { order, updateOrder } = useOrderStore();
  const { student } = useStudentStore();

  const handleAddService = async (id: string) => {
    if (id && student) {
      const _product = data;
      const change_order = order.find((f) => f.product?.id === _product?.id);
      if (change_order) {
        const un_change_order = order.filter((f) => f.id !== change_order.id);

        const data = [
          ...un_change_order,
          { ...change_order, amount: (change_order?.amount ?? 0) + 1 },
        ];

        updateOrder(data);
      } else {
        const data = [
          ...order,
          {
            id: uuidv4().toString(),
            rowno:
              order.length == 0
                ? 1
                : Math.max(...order.map((r) => r.rowno)) + 1,
            product: _product,
            student: student,
            amount: 1,
            price: _product?.price ?? 0,
            unit: _product?.unit ?? 0,
          },
        ];

        updateOrder(data);
      }
    }
  };

  return (
    <>
      <Button
        onClick={() => handleAddService(data.id)}
        variant={"ghost"}
        size={"iconsm"}
        className="hover:bg-sea-green-400/70 hover:font-bold"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </>
  );
};

type Product = {
  id: string;
  product_no: string;
  name: string;
  price: number;
};

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "product_no",
    header: "เลขที่",
  },
  {
    accessorKey: "name",
    header: "รายการ",
    cell: ({ row }) => (
      <div className="w-[180px] truncate">{row.original.name}</div>
    ),
    enableColumnFilter: true,
    footer: "รายการ",
  },
  {
    accessorKey: "price",
    header: "สภานะ",
  },
  {
    id: "action-min",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
