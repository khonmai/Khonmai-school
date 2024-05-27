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
import useFormModal from "@/hooks/modals/useFormTeacherModal";
import axios from "axios";
import React, {
  useEffect,
  useState,
} from "react";
import { Merge, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUpload from "@/components/image-upload";
import { TeacherSchema } from "./form-schema";
import { Image as ImageType, Teacher } from "@prisma/client";
import useTeachers from "@/hooks/useTeachers";

interface FormTeacherProps {
  // initialData: Students | null;
  initialData: Merge<Teacher, { image: ImageType }>;
}

function FormTeacher({ initialData }: FormTeacherProps) {
  const formModal = useFormModal();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImateFile] = useState<File>();

  const [isEdit, setIsEdit] = useState(false);

  const { mutate: teacherMutate } = useTeachers();

  const form = useForm<Teacher>({
    resolver: zodResolver(TeacherSchema),
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData) {
      setIsEdit(true);
    }
  }, [initialData]);

  const onSubmit = async (data: Teacher) => {
    setIsLoading(true);

    const image_id = await handleFileUpload(imageFile);
    if (
      initialData?.image_id &&
      image_id &&
      image_id !== initialData?.image_id
    ) {
      await handleRemoveImage(initialData?.image_id!);
    }

    let body = {
      teacher_no: data.teacher_no,
      title: data.title,
      f_name: data.f_name,
      l_name: data.l_name,
      nickname: data.nickname,
      image_id: imageFile ? image_id : initialData?.image_id,
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
      await axios.post("/api/teacher", data);
      teacherMutate();
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
      await axios.patch(`/api/teacher/?id=${id}`, data);
      teacherMutate();
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

  async function handleFileUpload(file: File | undefined) {
    if (!file) {
      return null; // User canceled file selection
    }

    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post("/api/image", formData);
    return res.data.image.id;
  }

  async function handleRemoveImage(id: string) {
    if (id) {
      await axios.delete(`/api/image/?id=${id}`);
    }
  }

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="font-semibold text-xl">
        {initialData ? "Edit Teacher" : "Add Teacher"}
      </h2>
      <Separator className="mt-4" />
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-wrap flex-grow space-y-2 space-x-4 w-full"
          >
            <FormField
              control={form.control}
              name="image_id"
              render={({ field }) => (
                <FormItem className="w-full flex justify-center pb-2">
                  <FormControl>
                    <ImageUpload
                      onSelected={(file) => setImateFile(file)}
                      image={initialData?.image ?? null}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator />
            <FormField
              control={form.control}
              name="teacher_no"
              render={({ field }) => {
                return (
                  <FormItem className="min-w-[250px]">
                    <FormLabel>รหัสครู</FormLabel>
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
              name="title"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>คำนำหน้า</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value!} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="f_name"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>ชื่อ</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="l_name"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>สกุล</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>ชื่อเล่น</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value!} />
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

export default FormTeacher;
