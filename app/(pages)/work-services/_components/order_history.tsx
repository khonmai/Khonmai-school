import { PaidStatus } from "@/components/paid-status";
import { DataTable } from "@/components/ui/data-table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useOrder from "@/hooks/useOrder";
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink, History, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";
import useReceiptModal from "@/hooks/modals/useReceiptModal";

export function OrderHistory() {
  const { data: order_data, isLoading } = useOrder();
  const [childOpen, setChildOpen] = useState(false);

  const formatedData: Order[] = order_data?.map((item: any) => ({
    id: item.id,
    order_no: item.order_no,
    name: `${item.student.title}${item.student.f_name} ${item.student.l_name} (${item.student.nickname})`,
    status: item.is_paid,
    datecreate: format(item.createdAt, "dd-MMM-yyyy"),
  }));

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <History className="h-6 w-6" />
          {/* <Button variant="outline">Open</Button> */}
        </SheetTrigger>
        <SheetContent className="w-[600px] max-w-[100%]">
          <SheetHeader>
            <SheetTitle>Order History</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="grid w-[100%] h-[100%] pb-8">
            <ScrollArea>
              <DataTable
                columns={columns}
                data={formatedData || []}
                isPagination={false}
              />
              <ScrollBar orientation="horizontal"  />
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

interface CellActionProps {
  data: any;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const receiptModal = useReceiptModal();

  return (
    <>
      <ExternalLink
        onClick={() => receiptModal.onOpen(data.id)}
        className="w-4 h-4 cursor-pointer"
      />
    </>
  );
};

type Order = {
  id: string;
  order_no: string;
  name: string;
  status: boolean;
  datecreate: string;
};

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "order_no",
    header: "เลขที่",
    enableColumnFilter: true,
    footer: "เลขที่",

  },
  {
    accessorKey: "name",
    header: "ชื่อ - สกุล",
    cell: ({ row }) => (
      <div className="w-[180px] truncate">{row.original.name}</div>
    ),
    enableColumnFilter: true,
    footer: "ชื่อ - สกุล",
  },
  {
    accessorKey: "status",
    header: "สภานะ",
    cell: ({ row }) => <PaidStatus status={row.original.status} />,
  },
  {
    accessorKey: "datecreate",
    header: "วันที่",
  },
  {
    id: "action-min",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
