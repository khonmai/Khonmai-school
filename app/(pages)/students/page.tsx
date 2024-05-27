"use client";

import React, { useCallback } from "react";
import { Student, columns } from "./_components/columns";
import { DataTable } from "@/components/ui/data-table";
import useStudents from "@/hooks/useStudents";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import useFormStudentModal from "@/hooks/modals/useFormStudentModal";
import CardStudent from "./_components/card-student";

function StudentsPage() {
  const formModal = useFormStudentModal();
  const { data: students = [], isLoading } = useStudents();

  const formatedStudent: Student[] = students.map((item: any) => ({
    id: item.id,
    student_no: item.student_no,
    name: (item.t_name ?? "") + item.f_name + " " + item.l_name,
    nickname: item.nickname,
    birthdate: item?.birthdate ? format(item?.birthdate, "dd MMMM yyyy") : "",
  }));

  return (
    <div className="w-full px-2 m-auto ">
      <div className="flex items-center justify-between pb-4">
        <Heading title={`Student`} description="Manage student data" />
        <Button
          variant={"primary"}
          size={"icon"}
          onClick={() => formModal.onOpen()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <DataTable columns={columns} data={formatedStudent} />

      <div className="flex flex-1">
        {students &&
          students.map((item: any) => {
            return <CardStudent key={item?.id} data={item} />;
          })}
      </div>
    </div>
  );
}

export default StudentsPage;
