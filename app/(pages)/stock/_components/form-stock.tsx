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
import useTrip from "@/hooks/useTrip";
import { Stock } from "@prisma/client";
import useFormTripModal from "@/hooks/modals/useFormTripModal";
import useStockModal from "@/hooks/modals/useStockModal";
import { Combobox } from "@/components/ui/combobox";
import useProducts from "@/hooks/useProducts";
import useStock from "@/hooks/useStock";
import useIsLoading from "@/hooks/modals/useIsLoading";

function FormStock() {
  const formModal = useStockModal();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const pageLoading = useIsLoading();

  const { mutate: stockMutate } = useStock();

  const form = useForm<Stock>();

  const { data: product = [] } = useProducts();
  let product_data = product
    .filter((item: any) => item.category.name == "สินค้า")
    .map((data: any) => {
      return {
        value: data.id,
        label: data.name,
      };
    });

  const handleOnSelectedProduct = (val: any) => {
    setSelectedProduct(val);
  };

  const onSubmit = async (data: Stock) => {
    pageLoading.onLoading();
    const body = {
      product_id: selectedProduct,
      amount: data.amount,
      multiplier: 1,
    };

    try {
      await axios.post("/api/stock", body);
      stockMutate();
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

    formModal.onClose();
  };

  return (
    <div className="w-full mx-auto p-6">
      <h2 className="font-semibold text-xl">{"Add Stock"}</h2>
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
              name="product_id"
              render={({ field }) => (
                <FormItem className="min-w-[250px]">
                  <FormLabel>ประเภท</FormLabel>
                  <FormControl>
                    <Combobox
                      datas={product_data}
                      label="Product"
                      onSelected={handleOnSelectedProduct}
                      data_value={selectedProduct}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => {
                return (
                  <FormItem className="min-w-[250px]">
                    <FormLabel>จำนวน</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
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

export default FormStock;
