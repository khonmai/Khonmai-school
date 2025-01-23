"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, yearsToDays } from "date-fns";
import { CalendarIcon, Download, Plus, Printer, Search } from "lucide-react";
import { Heading } from "@/components/heading";
import useFormProductModal from "@/hooks/modals/useFormProductModal";
import LoadingPage from "@/components/loading";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import DailyReport, { DailyReportData } from "../_components/daily_report";
import * as XLSX from "xlsx";

function ReportPage() {
  const formModal = useFormProductModal();
  const [date, setDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<DailyReportData[]>();

  async function handleDailyReport() {
    setIsLoading(true);
    if (date) {
      const retport = await axios.get(`/api/reports/daily/?date=${date}`); //2024-05-08

      const formatedData: DailyReportData[] = retport?.data?.map(
        (item: any) => ({
          id: item.id,
          order_no: item.order_no,
          student: `${item.student?.student_no} : ${item.student?.f_name} ${item.student?.f_name}`,
          sum_order: item.OrderDetail.reduce(
            (s: number, i: any) => s + parseFloat(i.price) * i.amount,
            0
          ),
          payment_method: item.payment_method,
          paydate: item.pay_date,
          order_detail: item.OrderDetail,
        })
      );
      setReportData(formatedData);
    } else {
      toast({
        variant: "info",
        description: `กรุณาเลือกวันที่ต้องการ`,
      });
    }
    setIsLoading(false);
  }

  const onExport = async (title?: string, worksheetname?: string) => {
    try {
      // Check if the action result contains data and if it's an array
      if (reportData && Array.isArray(reportData)) {
        const dataToExport = reportData.map((d: any) => {
          // console.log(d);
          let data = d.order_detail?.map((c: any) => ({
            BillNo: d.order_no,
            Name: d.student,
            Order: c.product.name,
            Amount: c.amount,
            Price: c.product.price,
            PayDate: format(d.paydate, "dd MMM yyyy HH:mm"),
            Tranfer: d.payment_method == "qrscan" ? d.sum_order : "",
            Cash: d.payment_method == "cash" ? d.sum_order : "",
          }));

          return data;
        });

        // Create Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport.flat(2));
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
      } else {
        console.log("#==================Export Error");
      }
    } catch (error: any) {
      console.log("#==================Export Error", error.message);
    }
  };

  return (
    <>
      {isLoading && <LoadingPage isLoading={isLoading} />}{" "}
      <div className="w-full px-2 m-auto ">
        <div className="flex items-center justify-between pb-4">
          <Heading title={`Daily Reports`} description="View Report" />
        </div>

        <div className="flex items-center justify-between pb-2 gap-1">
          <div className="flex gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "min-w-[180px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "dd-MMM-yyyy")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  defaultMonth={date}
                />
              </PopoverContent>
            </Popover>
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => handleDailyReport()}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <Button
              onClick={() =>
                onExport(`Daily${format(date ?? "", "dd-MMM-yyyy")}`, "Report")
              }
              variant={"ghost"}
              size={"icon"}
              disabled={reportData?.length != 0 ? false : true}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              onClick={() =>
                onExport(`Daily${format(date ?? "", "dd-MMM-yyyy")}`, "Report")
              }
              variant={"ghost"}
              size={"icon"}
              disabled={reportData?.length != 0 ? false : true}
            >
              <Printer className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {reportData && <DailyReport data={reportData} />}
      </div>
    </>
  );
}

export default ReportPage;

const list_of_moutn = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
