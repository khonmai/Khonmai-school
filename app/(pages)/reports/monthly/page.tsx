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
import { CalendarIcon, Plus, Search } from "lucide-react";
import { Heading } from "@/components/heading";
import useFormProductModal from "@/hooks/modals/useFormProductModal";
import LoadingPage from "@/components/loading";
import useReports from "@/hooks/useReports";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import MonthlyReport, {
  MonthlyReportData,
} from "../_components/monthly_retport";
import { Combobox } from "@/components/ui/combobox";

function ReportPage() {
  const formModal = useFormProductModal();
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<MonthlyReportData[]>();
  const [yearSelected, setYearSelected] = useState("");
  const [monthSelected, setMonthSelected] = useState("");
  let yearData = [];

  useEffect(() => {
    setYearSelected(new Date().getFullYear().toString());
    setMonthSelected((new Date().getMonth() + 1).toString());
  }, []);

  for (let i = 0; i <= 10; i++) {
    const now = new Date();
    const _year = {
      value: (now.getFullYear() - i).toString(),
      label: (now.getFullYear() - i).toString(),
    };
    yearData.push(_year);
  }

  const monthData = list_of_moutn.map((item, i) => {
    return { value: (i + 1).toString(), label: item };
  });

  const handleOnSelectedYear = (val: any) => {
    setYearSelected(val);
  };
  const handleOnSelectedMonth = (val: any) => {
    setMonthSelected(val);
  };

  async function handleMonthReport() {
    setIsLoading(true);
    const retport = await axios.get(
      `/api/reports/monthly/?date=${yearSelected}-${monthSelected}`
    ); //2024-05-08

    const formatedData: MonthlyReportData[] = retport?.data?.map(
      (item: any) => {
        const _date = new Date(item.createdAt);
        return {
          // paydate: new Date(
          //   `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`
          // ),
          paydate: `${_date.getFullYear()}-${_date.getMonth() + 1}-${_date.getDate()}`,
          order_detail: item.OrderDetail,
        };
      }
    );
    setReportData(formatedData);

    setIsLoading(false);

    console.log(Object.groupBy(formatedData ,(d)=> {return `${d.paydate}`}))
  }

  return (
    <>
      {isLoading && <LoadingPage isLoading={isLoading} />}{" "}
      <div className="w-full px-2 m-auto ">
        <div className="flex items-center justify-between pb-4">
          <Heading title={`Daily Reports`} description="View Report" />
        </div>

        <div className="flex items-center justify-end pb-2 gap-1">
          <div className="w-[80px]">
            <Combobox
              datas={yearData}
              label="Year"
              onSelected={handleOnSelectedYear}
              data_value={yearSelected}
            />
          </div>
          <div className="w-[120px]">
            <Combobox
              datas={monthData}
              label="Month"
              onSelected={handleOnSelectedMonth}
              data_value={monthSelected}
            />
          </div>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => handleMonthReport()}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {reportData && <MonthlyReport data={reportData} />}
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
