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
import { TripSchema } from "./form-schema";
import useTrip from "@/hooks/useTrip";
import { Trip } from "@prisma/client";
import useFormTripModal from "@/hooks/modals/useFormTripModal";
import useIsLoading from "@/hooks/modals/useIsLoading";

interface FormTripProps {
  // initialData: Students | null;
  initialData: Trip | null;
}

function FormTrip({ initialData }: FormTripProps) {
  const formModal = useFormTripModal();
  const [isLoading, setIsLoading] = useState(false);
  const pageLoading = useIsLoading();

  const { mutate: tripMutate } = useTrip();

  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<Trip>({
    resolver: zodResolver(TripSchema),
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData) {
      setIsEdit(true);
    }
  }, [initialData]);

  const onSubmit = async (data: Trip) => {
    setIsLoading(true);
    pageLoading.onLoading();

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
      await axios.post("/api/trip", data);
      tripMutate();
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
      pageLoading.onLoaded();
    }
  };

  const update = async (data: any, id: string) => {
    try {
      await axios.patch(`/api/trip/?id=${id}`, data);
      tripMutate();
      formModal.onClose();
      toast({
        title: "Updated success",
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: "Updated error",
        variant: "destructive",
        description: `Error : ${error.response.data}`,
      });
    } finally {
      setIsLoading(false);
      pageLoading.onLoaded();
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="font-semibold text-xl">
        {initialData ? "Edit Trip" : "Add Trip"}
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
                    <FormLabel>ชื่อเส้นทาง</FormLabel>
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

export default FormTrip;
