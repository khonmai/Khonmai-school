// @ts-check
"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
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
import React, { useEffect, useState } from "react";
import { Merge, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { ProductSchema } from "./form-schema";
import useProducts from "@/hooks/useProducts";
import useFormProductModal from "@/hooks/modals/useFormProductModal";
import useCategory from "@/hooks/useCategory";
import { Textarea } from "@/components/ui/textarea";
import useIsLoading from "@/hooks/modals/useIsLoading";

type ProductAmount = Merge<Product, { amount: number }>;

interface FormProductProps {
  // initialData: Students | null;
  initialData: ProductAmount;
}

function FormProduct({ initialData }: FormProductProps) {
  const formModal = useFormProductModal();
  const [isLoading, setIsLoading] = useState(false);
  const pageLoading = useIsLoading();

  const [isEdit, setIsEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { mutate: productMutate } = useProducts();

  const form = useForm<ProductAmount>({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialData || {
      price: 0,
      amount: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      setIsEdit(true);
      handleOnSelectedCategory(initialData.category_id);
    }
  }, [initialData]);

  const { data: category = [] } = useCategory();
  let category_data = category.map((data: any) => {
    return {
      value: data.id,
      label: data.name,
    };
  });

  const handleOnSelectedCategory = (val: any) => {
    setSelectedCategory(val);
  };

  const onSubmit = async (data: ProductAmount) => {
    if (!selectedCategory) {
      toast({
        title: "Select Category",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    pageLoading.onLoading();

    let body = {
      product_no: data.product_no,
      name: data.name,
      price: data.price,
      category_id: selectedCategory,
      detail: data.detail,
      unit: data.unit,
      amount: isEdit ? undefined : data.amount,
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
      await axios.post("/api/product", data);
      productMutate();
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
      await axios.patch(`/api/product/?id=${id}`, data);
      productMutate();
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
        {initialData ? "Edit Product" : "Add Product"}
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
              name="product_no"
              render={({ field }) => {
                return (
                  <FormItem className="min-w-[250px]">
                    <FormLabel>รหัสสินค้า</FormLabel>
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
              name="name"
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
              name="price"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>ราคา</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={field?.value?.toString() ?? 0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>หน่วย</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>ประเภท</FormLabel>
                  <FormControl>
                    <Combobox
                      datas={category_data}
                      label="Category"
                      onSelected={handleOnSelectedCategory}
                      data_value={selectedCategory}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>จำนวน</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={field.value}
                      readOnly={isEdit}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>รายละเอียด</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value!}
                      className="resize-none"
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

export default FormProduct;
