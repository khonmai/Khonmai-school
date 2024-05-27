import { ArrowUpDown } from "lucide-react";
import { Button } from "./button";

interface SortingColumnProps {
  column: any;
  title: string;
}

export default function SortingColumn({ column, title }: SortingColumnProps) {
  return (
    <Button
      className="font-bold"
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
