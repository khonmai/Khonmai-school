"use client";

import React, { useCallback } from "react";
import { Trip, columns } from "./_components/columns";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import useFormTripModal from "@/hooks/modals/useFormTripModal";
import useTrip from "@/hooks/useTrip";
import LoadingPage from "@/components/loading";

function TripPage() {
  const formModal = useFormTripModal();
  const { data: trip, isLoading, mutate } = useTrip();

  const formatedTrip: Trip[] = trip?.map((item: any) => ({
    id: item.id,
    name: item.name,
  }));

  return (
    <>
      {isLoading && <LoadingPage isLoading={isLoading} />}{" "}
      <div className="w-full px-2 m-auto ">
        <div className="flex items-center justify-between pb-4">
          <Heading title={`Trip`} description="Manage Trip data" />
          <Button
            variant={"primary"}
            size={"icon"}
            onClick={() => formModal.onOpen()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <DataTable columns={columns} data={formatedTrip || []} />
      </div>
    </>
  );
}

export default TripPage;
