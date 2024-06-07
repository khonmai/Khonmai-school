"use client";

import { ColumnDef } from "@tanstack/react-table";
import SortingColumn from "@/components/ui/sortingcolumn";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { CellAction } from "./cell-action";
import { CellEdit } from "./cell-edit";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  id: string;
  rowno: number;
  product_no: string;
  name: string;
  price: string;
  unit: string;
  amount: number;
  total?: number;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "product_no",
    header: "รหัสสินค้า",
  },
  {
    accessorKey: "name",
    header: "รายการ",
  },
  {
    accessorKey: "price",
    header: "ราคา",
  },
  {
    accessorKey: "unit",
    header: "หน่วย",
  },
  {
    accessorKey: "amount",
    header: "จำนวน",
    cell: ({ row }) => <CellEdit data={row.original} />,
  },
  {
    accessorKey: "total",
    header: "รวม",
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
