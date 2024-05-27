"use client";

import React, { useCallback } from "react";
import { Product, columns } from "./_components/columns";
import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import useProducts from "@/hooks/useProducts";
import useFormProductModal from "@/hooks/modals/useFormProductModal";

function ProductPage() {
  const formModal = useFormProductModal();
  const { data: products = [], isLoading } = useProducts();

  const formatedTeacher: Product[] = products?.map((item: any) => ({
    id: item.id,
    product_no: item.product_no,
    name: item.name,
    price: item.price,
    unit: item.unit,
    category : item.category?.name ?? "" 
  }));

  return (
    <div className="w-full px-2 m-auto ">
      <div className="flex items-center justify-between pb-4">
        <Heading title={`Product`} description="Manage Product " />
        <Button
          variant={"primary"}
          size={"icon"}
          onClick={() => formModal.onOpen()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <DataTable columns={columns} data={formatedTeacher || []} />
    </div>
  );
}

export default ProductPage;
