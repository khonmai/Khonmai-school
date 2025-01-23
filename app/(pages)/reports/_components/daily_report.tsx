import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

export interface DailyReportTableProps {
  data: DailyReportData[];
}

function DailyReport({ data }: DailyReportTableProps) {
  const [sumQr, setSumQr] = useState(0);
  const [sumCash, setSumCash] = useState(0);

  useEffect(() => {
    setSumQr(
      data
        .filter((f) => f.payment_method == "qrscan")
        .reduce((s: number, i: any) => s + parseFloat(i.sum_order), 0)
    );

    setSumCash(
      data
        .filter((f) => f.payment_method == "cash")
        .reduce((s: number, i: any) => s + parseFloat(i.sum_order), 0)
    );

  }, [data]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>เลขบิล</TableHead>
            <TableHead>ชื่อ - สกุล</TableHead>
            <TableHead>รายการ</TableHead>
            <TableHead>จำนวน</TableHead>
            <TableHead>ราคา/หน่วย</TableHead>
            <TableHead>วันที่จ่าย</TableHead>
            <TableHead>โอน</TableHead>
            <TableHead>เงินสด</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <>
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.order_no}</TableCell>
                <TableCell>{item.student}</TableCell>
                <TableCell>{item.order_detail[0].product?.name}</TableCell>
                <TableCell>{item.order_detail[0].amount}</TableCell>
                <TableCell>{item.order_detail[0].price}</TableCell>
                <TableCell>
                  {format(item.paydate, "dd MMM yyyy HH:mm")}
                </TableCell>
                <TableCell>
                  {item.payment_method == "qrscan" ? item.sum_order : ""}
                </TableCell>
                <TableCell>
                  {item.payment_method == "cash" ? item.sum_order : ""}
                </TableCell>
              </TableRow>
              {item?.order_detail?.map((child, i) => {
                if (i == 0) return <></>;
                return (
                  <TableRow key={child.id}>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>{child.product?.name}</TableCell>
                    <TableCell>{child.amount}</TableCell>
                    <TableCell>{child.price}</TableCell>
                    <TableCell colSpan={3}></TableCell>
                  </TableRow>
                );
              })}
            </>
          ))}
        </TableBody>
        {data.length != 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>รวม</TableCell>
              <TableCell>{sumQr}</TableCell>
              <TableCell>{sumCash}</TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </>
  );
}
export default DailyReport;

export type DailyReportData = {
  id: string;
  order_no: string;
  student: string;
  order: string;
  paydate: number;
  amount: string;
  teacher: string;
  sum_order: string;
  payment_method: string;
  order_detail: DailyReportDetailData[];
};

export type DailyReportDetailData = {
  id: string;
  order_no: string;
  student: string;
  order: string;
  price: number;
  amount: number;
  teacher: string;
  sum_order: string;
  payment_method: string;
  product: Product;
};

export type Product = {
  name: string;
};
