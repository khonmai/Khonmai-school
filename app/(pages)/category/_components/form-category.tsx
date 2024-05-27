// @ts-check
"use client";

import { Button } from "@/components/ui/button";
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
import axios from "axios";
import React, {
  HTMLInputTypeAttribute,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "./form-schema";
import useCategory from "@/hooks/useCategory";
import { Category } from "@prisma/client";
import useFormCategoryModal from "@/hooks/modals/useFormCategoryModal";

interface FormCategoryProps {
  // initialData: Students | null;
  initialData: Category | null;
}

function FormCategory({ initialData }: FormCategoryProps) {
  const formModal = useFormCategoryModal();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: categoryMutate } = useCategory();

  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<Category>({
    resolver: zodResolver(CategorySchema),
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData) {
      setIsEdit(true);
    }
  }, [initialData]);

  const onSubmit = async (data: Category) => {
    setIsLoading(true);

    let body = {
      name: data.name,
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
      await axios.post("/api/category", data);
      categoryMutate();
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
      await axios.patch(`/api/category/?id=${id}`, data);
      categoryMutate();
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
        {initialData ? "Edit Category" : "Add Category"}
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
                    <FormLabel>ชื่อหมวดหมู่่</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
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

export default FormCategory;
