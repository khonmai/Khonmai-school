"use client";

import React, { MouseEvent, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import useStudents from "@/hooks/useStudents";
import axios from "axios";
import { Students } from "@prisma/client";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { join } from "path";
import CardStudent from "../../students/_components/card-student";
import useStudentStore from "@/hooks/useStudentStore";

function SelectStudent() {
  const { student, updateStudent } = useStudentStore();

  const [studentNo, setStudentNo] = useState("");
  const form = useForm();

  const handleSelectStudent = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!studentNo) {
      toast({
        title: "Warning",
        description: "กรุณากรอกรหัสนักเรียน",
        variant: "warning",
      });
      return;
    }

    const res = await axios.get(`/api/student/?student_no=${studentNo}`);
    if (!res.data) {
      toast({
        title: "Warning",
        description: "ไม่พบข้อมูล",
        variant: "warning",
      });
      return;
    }
    updateStudent(res.data);
    setStudentNo("")
  };

  return (
    <div className="w-full mx-auto">
      {!student ? (
        <div className="flex ">
          <Form {...form}>
            <form onSubmit={() => {}} className="flex flex-wrap items-end">
              <FormField
                control={form.control}
                name="student_no"
                render={({ field }) => {
                  return (
                    <FormItem className="min-w-[250px]">
                      <FormLabel>รหัสนักเรียน : </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={studentNo}
                          onChange={(e) => setStudentNo(e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              <Button
                onClick={(e) => handleSelectStudent(e)}
                variant={"primary"}
                size={"icon"}
                className="ml-2"
              >
                <Search className="w-6 h-6" />
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <CardStudent data={student} />
      )}
    </div>
  );
}

export default SelectStudent;
