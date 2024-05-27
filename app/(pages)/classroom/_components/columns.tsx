"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import SortingColumn from "@/components/ui/sortingcolumn";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ClassRoom = {
  id: string;
  name: string;
  teacher: string;
};

export const columns: ColumnDef<ClassRoom>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortingColumn column={column} title="ชั้น" />,
    enableColumnFilter: true,
    footer: "ชั้น",
  },
  {
    accessorKey: "teacher",
    header: ({ column }) => (
      <SortingColumn column={column} title="ครูประจำชั้น" />
    ),
    enableColumnFilter: true,
    footer: "ครูประจำชั้น",
  },

  { id: "action", cell: ({ row }) => <CellAction data={row.original} /> },
];
