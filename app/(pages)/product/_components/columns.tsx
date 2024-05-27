"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import SortingColumn from "@/components/ui/sortingcolumn";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: string;
  product_no: string;
  name: string;
  price: number;
  type: string;
  amount: string;
  category: string;
};

export const columns: ColumnDef<Product>[] = [
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
    header: ({ column }) => <SortingColumn column={column} title="ชื่อ" />,
    enableColumnFilter: true,
    footer: "ชื่อ",
  },
  {
    accessorKey: "category",
    header: ({ column }) => <SortingColumn column={column} title="หมวดหมู่" />,
    footer: "หมวดหมู่",
  },
  {
    accessorKey: "price",
    header: ({ column }) => <SortingColumn column={column} title="ราคา" />,
  },
  {
    accessorKey: "unit",
    header: ({ column }) => <SortingColumn column={column} title="หน่วย" />,
  },
  { id: "action", cell: ({ row }) => <CellAction data={row.original} /> },
];
