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

export interface MonthlyReportTableProps {
  data: MonthlyReportData[];
}

function MonthlyReport({ data }: MonthlyReportTableProps) {
  const [sumTotal, setSumTotal] = useState(0);

  useEffect(() => {
    setSumTotal(99);
  }, [data]);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>วันที่</TableHead>
            <TableHead>รายการ</TableHead>
            <TableHead>จำนวน</TableHead>
            <TableHead>ราคา</TableHead>
            <TableHead>รวม</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <>
              <TableRow>
                <TableCell className="font-medium">{item.paydate.toString()}</TableCell>
                <TableCell>{item?.order_detail[0].product?.name}</TableCell>
                <TableCell>{item?.order_detail[0].amount}</TableCell>
                <TableCell>{item?.order_detail[0].price}</TableCell>
                <TableCell>
                  {item?.order_detail[0].price * item?.order_detail[0].amount}
                </TableCell>
              </TableRow>
              {item?.order_detail?.map((child, i) => {
                if (i == 0) return <></>;
                return (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>{child.product?.name}</TableCell>
                    <TableCell>{child.amount}</TableCell>
                    <TableCell>{child.price}</TableCell>
                    <TableCell>{child.amount * child.price}</TableCell>
                  </TableRow>
                );
              })}
            </>
          ))}
        </TableBody>
        {data.length != 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>รวม</TableCell>
              <TableCell>{sumTotal}</TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </>
  );
}
export default MonthlyReport;

export type MonthlyReportData = {
  paydate: Date;
  order_detail: MonthlyReportDetailData[];
};

export type MonthlyReportDetailData = {
  product: Product;
  amount: number;
  price: number;
};

export type Product = {
  name: string;
};
