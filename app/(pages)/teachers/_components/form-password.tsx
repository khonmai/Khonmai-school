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
import useFormModal from "@/hooks/modals/useFormTeacherModal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Merge, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordSchema, TeacherSchema } from "./form-schema";
import { Image as ImageType, Teacher } from "@prisma/client";
import useTeachers from "@/hooks/useTeachers";
import { useSession } from "next-auth/react";

export type ConfirmPassword = {
  oldpassword: string;
  newpassword: string;
  confirmpassword: string;
};

function FormPassword() {
  const { data: session } = useSession();
  const formModal = useFormModal();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImateFile] = useState<File>();

  const { mutate: teacherMutate } = useTeachers();

  const form = useForm<ConfirmPassword>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit = async (data: ConfirmPassword) => {
    setIsLoading(true);

    let body = {
      oldpassword: data.oldpassword,
      newpassword: data.newpassword,
      id: session?.user.id,
    };

    changepassword(body);
  };

  const changepassword = async (data: any) => {
    try {
      await axios.post("/api/auth/changepassword", data);
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
        description: `Error : ${error.response.data}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="font-semibold text-xl">Change Password</h2>
      <Separator className="mt-4" />
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-grow  w-full"
          >
            <FormField
              control={form.control}
              name="oldpassword"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>Old-password</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value!} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newpassword"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>New-password</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value!} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmpassword"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>Confirm-password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full mt-4"
              disabled={isLoading}
              variant={"primary"}
            >
              บันทึก
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default FormPassword;
