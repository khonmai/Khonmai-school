"use client";

import React, { useCallback } from "react";
import { Teacher, columns } from "./_components/columns";
import { DataTable } from "@/components/ui/data-table";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import useFormTeacherModal from "@/hooks/modals/useFormTeacherModal";
import useTeachers from "@/hooks/useTeachers";

function TeacherPage() {
  const formModal = useFormTeacherModal();
  const { data: teachers = [], isLoading } = useTeachers();

  const formatedTeacher: Teacher[] = teachers?.map((item: any) => ({
    id: item.id,
    teacher_no: item.teacher_no,
    name: (item.t_name ?? "") + item.f_name + " " + item.l_name,
    nickname: item.nickname,
  }));

  return (
    <div className="w-full px-2 m-auto ">
      <div className="flex items-center justify-between pb-4">
        <Heading title={`Teacher`} description="Manage teacher personal data" />
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

export default TeacherPage;
