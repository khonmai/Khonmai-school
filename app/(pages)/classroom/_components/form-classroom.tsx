// @ts-check
"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { DatePicker } from "@/components/ui/datepicker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import useClassRoom from "@/hooks/useClassRoom";
import axios from "axios";
import React, {
  HTMLInputTypeAttribute,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClassRoomSchema } from "./form-schema";
import { ClassRoom } from "@prisma/client";
import useTeachers from "@/hooks/useTeachers";
import useFormClassRoomModal from "@/hooks/modals/useFormClassRoomModal";

interface FormClassRoomProps {
  // initialData: Students | null;
  initialData: ClassRoom | null;
}

function FormClassRoom({ initialData }: FormClassRoomProps) {
  const formModal = useFormClassRoomModal();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const { mutate: classRoomMutate } = useClassRoom();

  const [isEdit, setIsEdit] = useState(false);
  console.log(initialData);

  const form = useForm<ClassRoom>({
    resolver: zodResolver(ClassRoomSchema),
    defaultValues: initialData || {},
  });

  const { data: teacher = [] } = useTeachers();
  let teacher_data = teacher.map((data: any) => {
    return {
      value: data.id,
      label: (data.t_name ?? "") + data.f_name + " " + data.l_name,
    };
  });

  useEffect(() => {
    if (initialData) {
      setIsEdit(true);
      setSelectedTeacher(initialData?.teacher_id!);
    }
  }, [initialData]);

  const handleOnSelectedTeacher = (val: any) => {
    setSelectedTeacher(val);
  };

  const onSubmit = async (data: ClassRoom) => {
    setIsLoading(true);

    let body = {
      name: data.name,
      teacher_id: selectedTeacher,
    };

    if (isEdit) {
      update(body, initialData?.id!);
    } else {
      create(body);
    }
    // setIsLoading(true);
  };

  const create = async (data: any) => {
    try {
      await axios.post("/api/classroom", data);
      classRoomMutate();
      formModal.onClose();
      toast({
        title: "Success",
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: `Error : ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (data: any, id: string) => {
    try {
      await axios.patch(`/api/classroom/?id=${id}`, data);
      classRoomMutate();
      formModal.onClose();
      toast({
        title: "Updated success",
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: "Updated error",
        variant: "destructive",
        description: `Error : ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="font-semibold text-xl">
        {initialData ? "Edit Class Room" : "Add Class Room"}
      </h2>
      <Separator className="mt-4" />
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-wrap flex-grow space-y-2 space-x-4 w-full"
          >
            <Separator />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="min-w-[250px]">
                    <FormLabel>ชั้น</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="teacher_id"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>ครูประจำชั้น</FormLabel>
                  <FormControl>
                    <Combobox
                      datas={teacher_data}
                      label="Province"
                      onSelected={handleOnSelectedTeacher}
                      data_value={selectedTeacher}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" disabled={isLoading} variant={"primary"}>
              บันทึก
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default FormClassRoom;
