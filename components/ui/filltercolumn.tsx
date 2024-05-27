import React, { useState } from "react";
import { Input } from "./input";
import { Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface FillterColumnProps<TData> {
  table: Table<TData>;
  columns: any;
}
function FillterColumn<TData>({
  table,
  columns = [],
}: FillterColumnProps<TData>) {
  const [isFilter, setIsFilter] = useState(false);
  return (
    <div className={cn(isFilter && "flex gap-2 items-center py-4")}>
      {isFilter && <p>Filter : </p>}
      {/* {columns &&
        columns.map((column: any) => {
          <Input
            placeholder={`Filter ${column.accessorKey}_no...`}
            value={
              (table.getColumn("student_no")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("student_no")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />;
        })} */}
      {columns &&
        columns.map((column: any) => {
          if (column.enableColumnFilter) {
            setTimeout(() => {
              setIsFilter(true);
            }, 0);
            return (
              <Input
                key={column.accessorKey}
                placeholder={column.footer}
                value={
                  (table
                    .getColumn(column.accessorKey)
                    ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table
                    .getColumn(column.accessorKey)
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm w-min"
              />
            );
          }
        })}
    </div>
  );
}

export default FillterColumn;
