"use client";

import React, { useEffect, useState } from "react";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import SelectStudent from "./_components/select-student";
import { Product as ProductType, Students } from "@prisma/client";
import useOrderStore from "@/hooks/useOrderStore";
import { Button } from "@/components/ui/button";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  History,
  Plus,
  ShoppingCart,
  Trash,
} from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import useProducts from "@/hooks/useProducts";
import { Order, columns } from "./_components/columns";
import { DataTable } from "@/components/ui/data-table";
import { v4 as uuidv4 } from "uuid";

import generatePayload from "promptpay-qr";
import qrcode from "qrcode";
import useStudentStore from "@/hooks/useStudentStore";
import { AlertModal } from "@/components/modals/alert-modal";
import usePaymentModal from "@/hooks/modals/usePaymentModal";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PDFViewer, usePDF } from "@react-pdf/renderer";
import { Receipt } from "./_components/receipt";
import useOrder from "@/hooks/useOrder";
import { OrderHistory } from "./_components/order_history";
import Product from "./_components/product";
import { useMediaQuery } from "usehooks-ts";
import { Label } from "@/components/ui/label";

function WorkServicesPage() {
  const { order, updateOrder } = useOrderStore();
  const { student, updateStudent } = useStudentStore();

  const paymentModal = usePaymentModal();
  const isMobile = useMediaQuery("(max-width:768px)");

  // const { data: order_data } = useOrder("clwodkc5b0001122xd7ix45w4");
  // const [instance, updateInstance] = usePDF({ document: <MyDocument /> });

  const [selectedProduct, setSelectedProduct] = useState("");
  const [formatedOrderData, setFormatedOrderData] = useState<Order[]>([]);

  const [qrcodesvg, setQrcodesvg] = useState("");
  const [qrcodeurl, setQrcodeurl] = useState("");

  useEffect(() => {
    const formatedData: Order[] = order?.map((item: any) => ({
      id: item.id,
      rowno: item.rowno,
      product_no: item.product?.product_no,
      name: item.product?.name,
      price: item.price,
      unit: item.unit,
      amount: item.amount,
      total: item.amount * item.price,
    }));
    setFormatedOrderData(formatedData);
    console.log(formatedOrderData)
  }, [order, student]);

  const { data: product = [] } = useProducts();

  let product_data = product.map((data: any) => {
    return {
      value: data.id.toString(),
      label: data.name,
    };
  });

  const handleOnSelectedProduct = (val: any) => {
    setSelectedProduct(val);
  };

  const handleAddService = async () => {
    if (selectedProduct && student) {
      const _product = product.find((f: any) => f.id === selectedProduct);

      const change_order = order.find((f) => f.product?.id === _product?.id);
      if (change_order) {
        const un_change_order = order.filter((f) => f.id !== change_order.id);

        const data = [
          ...un_change_order,
          { ...change_order, amount: (change_order?.amount ?? 0) + 1 },
        ];

        updateOrder(data);
      } else {
        const data = [
          ...order,
          {
            id: uuidv4().toString(),
            rowno:
              order.length == 0
                ? 1
                : Math.max(...order.map((r) => r.rowno)) + 1,
            product: _product,
            student: student,
            amount: 1,
            price: _product.price,
            unit: _product.unit,
          },
        ];

        updateOrder(data);
      }
      setSelectedProduct("");
    }
  };

  return (
    <>
      <div className="w-full h-full px-2 m-auto ">
        <div className="flex items-center justify-between pb-4">
          <Heading title={`Service`} description="Service" />
          <Button variant={"ghost"} size={"icon"} onClick={() => {}}>
            {/* <History className="h-6 w-6" /> */}
            <OrderHistory />
          </Button>
        </div>
        <Separator className="mb-2" />
        <SelectStudent />

        {student && (
          <>
            <Separator className="my-2" />
            <div className="flex flex-grow-0 gap-4">
              {!isMobile && (
                <div className="w-full">
                  <Label className="text-2xl">บริการ</Label>
                  {product && (
                    <Product
                      data={product.filter(
                        (item: any) => item.category.name == "ค่าใช้จ่าย"
                      )}
                    />
                  )}
                  <Separator className="my-2" />
                  <Label className="text-2xl">สินค้า</Label>
                  {product && (
                    <Product
                      data={product.filter(
                        (item: any) =>
                          item.category.name == "สินค้า" &&
                          item.stock[0]?.amount > 0
                      )}
                    />
                  )}
                </div>
              )}
              <div className="w-full">
                <div className="w-full mx-auto">
                  <div className="flex mb-2">
                    <Combobox
                      datas={product_data}
                      label="Product"
                      onSelected={handleOnSelectedProduct}
                      data_value={selectedProduct}
                    />
                    <Button
                      onClick={handleAddService}
                      variant={"primary"}
                      size={"icon"}
                      className="ml-2"
                    >
                      <Plus className="w-6 h-6" />
                    </Button>
                    <Button
                      onClick={() => {
                        updateOrder([]);
                      }}
                      variant={"destructive"}
                      size={"icon"}
                      className="ml-2"
                    >
                      <Trash className="w-6 h-6" />
                    </Button>
                  </div>
                  <div>
                    <DataTable
                      columns={columns}
                      data={formatedOrderData.sort((a, b) => a.rowno - b.rowno)}
                      isPagination={false}
                    />
                    <div className="w-full flex justify-end my-4 pr-2 text-3xl">
                      <div>รวมทั้งสิ้น :</div>
                      <p>
                        {formatedOrderData.reduce((accumulator, object) => {
                          return accumulator + (object?.total ?? 0);
                        }, 0)}{" "}
                        .-
                      </p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex space-x-2 mt-2 w-full">
                  <Button
                    onClick={() => {
                      updateStudent(null);
                      updateOrder([]);
                    }}
                    variant={"ghost"}
                  >
                    Cancle
                  </Button>
                  <Button
                    disabled={order.length <= 0}
                    onClick={() => paymentModal.onOpen()}
                    variant={"primary"}
                    className="w-full"
                  >
                    <ShoppingCart className="w-6 h-6 mr-2" /> Check Out
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* <Button
        onClick={() => {
          console.log(order);
          Math.max(...order.map((r) => r.rowno));
        }}
        variant={"primary"}
        className="w-full"
      >
        <ShoppingCart className="w-6 h-6 mr-2" /> Check Out
      </Button> */}

        <div>
          {/* {!instance.loading && (
            <a href={instance?.url!} download="test.pdf">
              Download
            </a>
          )} */}

          {/* <PDFViewer className="w-full h-[500px]" showToolbar>
            <Receipt orderData={order_data} />
          </PDFViewer> */}
        </div>
      </div>
    </>
  );
}

export default WorkServicesPage;
