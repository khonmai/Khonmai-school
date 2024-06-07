"use client";

import React, { useCallback } from "react";
import { ClassRoom, columns } from "./_components/columns";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import useFormClassRoomModal from "@/hooks/modals/useFormClassRoomModal";
import useClassRoom from "@/hooks/useClassRoom";
import LoadingPage from "@/components/loading";

function ClassRoomPage() {
  const formModal = useFormClassRoomModal();
  const { data: classrooms, isLoading, mutate } = useClassRoom();

  const formatedClassrooms: ClassRoom[] = classrooms?.map((item: any) => ({
    id: item.id,
    name: item.name,
    teacher: item.teacher
      ? (item.teacher?.t_name ?? "") +
        item.teacher?.f_name +
        " " +
        item.teacher?.l_name
      : "",
  }));

  return (
    <>
      {isLoading && <LoadingPage isLoading={isLoading} />}{" "}
      <div className="w-full px-2 m-auto ">
        <div className="flex items-center justify-between pb-4">
          <Heading title={`Class Room`} description="Manage Class Room data" />
          <Button
            variant={"primary"}
            size={"icon"}
            onClick={() => formModal.onOpen()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <DataTable columns={columns} data={formatedClassrooms || []} />
      </div>
    </>
  );
}

export default ClassRoomPage;
