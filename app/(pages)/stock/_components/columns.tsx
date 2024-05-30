"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import SortingColumn from "@/components/ui/sortingcolumn";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Stock = {
  id: string;
  product_no: string;
  name: string;
  amount: string;
  price: string;
  unit: string;
  updatedAt: Date;
};

export const columns: ColumnDef<Stock>[] = [
  {
    accessorKey: "product_no",
    header: ({ column }) => (
      <SortingColumn column={column} title="รหัสสินค้า" />
    ),
    enableColumnFilter: true,
    footer: "รหัสสินค้า",
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortingColumn column={column} title="รายการ" />,
    enableColumnFilter: true,
    footer: "รายการ",
  },
  {
    accessorKey: "price",
    header: "ราคาต่อหน่วย",
  },
  {
    accessorKey: "amount",
    header: "จำนวน",
  },

  {
    accessorKey: "unit",
    header: "หน่วย",
  },
  {
    accessorKey: "updatedAt",
    header: "อัพเดต",
  },
  // { id: "action", cell: ({ row }) => <CellAction data={row.original} /> },
];
