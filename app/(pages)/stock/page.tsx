"use client";

import React from "react";
import { Heading } from "@/components/heading";
import useStock from "@/hooks/useStock";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { Stock, columns } from "./_components/columns";
import { format } from "date-fns";
import useStockModal from "@/hooks/modals/useStockModal";
import LoadingPage from "@/components/loading";

function StockPage() {
  const formModal = useStockModal();

  const { data: stock = [], isLoading } = useStock();

  const formatedStudent: Stock[] = isLoading
    ? []
    : stock[0]?.Product?.map((item: any) => ({
        id: item.id,
        product_no: item.product_no,
        name: item.name,
        amount: item.stock[0]?.amount,
        price: item.price,
        unit: item.unit,
        updatedAt: item?.stock[0]?.updatedAt
          ? format(item?.stock[0]?.updatedAt, "dd MMMM yyyy HH:mm:ss")
          : "",
      }));

  return (
    <>
      {isLoading && <LoadingPage isLoading={isLoading} />}{" "}
      <div className="w-full px-2 m-auto ">
        <div className="flex items-center justify-between pb-4">
          <Heading title={`Stock`} description="Stock" />
          <Button
            variant={"primary"}
            size={"icon"}
            onClick={() => formModal.onOpen()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <DataTable columns={columns} data={formatedStudent} />
      </div>
    </>
  );
}

export default StockPage;
