"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import SortingColumn from "@/components/ui/sortingcolumn";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Teacher = {
  id: string;
  student_no: string;
  name: string;
  nickname: string;
};

export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "teacher_no",
    header: ({ column }) => (
      <SortingColumn column={column} title="รหัสครู" />
    ),
    enableColumnFilter: true,
    footer: "รหัสครู",
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortingColumn column={column} title="ชื่อ-สกุล" />,
    enableColumnFilter: true,
    footer: "ชื่อ-สกุล",
  },
  {
    accessorKey: "nickname",
    header: ({ column }) => <SortingColumn column={column} title="ชื่อเล่น" />,
  },
  { id: "action", cell: ({ row }) => <CellAction data={row.original} /> },
];
