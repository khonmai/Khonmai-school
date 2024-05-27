"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import SortingColumn from "@/components/ui/sortingcolumn";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Trip = {
  id: string;
  name: string;
};

export const columns: ColumnDef<Trip>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortingColumn column={column} title="เส้นทาง" />,
    enableColumnFilter: true,
    footer: "เส้นทาง",
  },

  { id: "action", cell: ({ row }) => <CellAction data={row.original} /> },
];
