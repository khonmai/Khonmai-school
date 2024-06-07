"use client";

import React, { useCallback } from "react";
import { Category, columns } from "./_components/columns";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import useCategory from "@/hooks/useCategory";
import useFormCategoryModal from "@/hooks/modals/useFormCategoryModal";
import LoadingPage from "@/components/loading";

function CategoryPage() {
  const formModal = useFormCategoryModal();
  const { data: category, isLoading, mutate } = useCategory();

  const formatedCategory: Category[] = category?.map((item: any) => ({
    id: item.id,
    name: item.name,
  }));

  return (
    <>
      {isLoading && <LoadingPage isLoading={isLoading} />}{" "}
      <div className="w-full px-2 m-auto ">
        <div className="flex items-center justify-between pb-4">
          <Heading title={`Category`} description="Manage Category data" />
          <Button
            variant={"primary"}
            size={"icon"}
            onClick={() => formModal.onOpen()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <DataTable columns={columns} data={formatedCategory || []} />
      </div>
    </>
  );
}

export default CategoryPage;
