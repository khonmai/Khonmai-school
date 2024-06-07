import prismadb from "@/lib/prismadb";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? undefined;
    if (id) {
      const order = await prismadb.order.findUnique({
        where: { id: id },
        include: {
          OrderDetail: { include: { product: true } },
          student: { include: { classroom: true } },
        },
      });
      return NextResponse.json(order);
    }

    const order = await prismadb.order.findMany({
      include: {
        OrderDetail: { include: { product: true } },
        student: { include: { classroom: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body) {
      const over_stock = await Promise.all(
        body.order.map(async (item: any) => {
          const check_stock = await prismadb.category.findFirst({
            where: { name: "สินค้า" },
            include: {
              Product: {
                include: {
                  stock: {
                    where: {
                      AND: [
                        { product_id: item.product.id },
                        { amount: { lt: item.amount } },
                      ],
                    },
                  },
                },
              },
            },
          });

          // const check_stock1 = await prismadb.stock.findFirst({
          //   where: {
          //     AND: [
          //       { product_id: item.product.id },
          //       { amount: { lt: item.amount } },
          //     ],
          //   },
          // });

          if (check_stock?.Product[0]?.stock?.length ?? 0 > 0) {
            const product = await prismadb.product.findUnique({
              where: { id: item.product.id },
            });

            return product;
          }
          return null;
        })
      );

      if (over_stock.filter((f) => f != null).length > 0) {
        return NextResponse.json(
          `${over_stock.filter((f) => f != null)[0].name ?? ""} over stock`,
          {
            status: 500,
          }
        );
      }

      const order_number = await prismadb.order.findFirst({
        orderBy: { createdAt: "desc" },
      });
      const order_data = {
        order_no: (parseInt(order_number?.order_no ?? "0") + 1)
          .toString()
          .padStart(5, "0"),
        student_id: body.student_id,
        teacher_id: body.teacher_id,
        is_paid: body.is_paid,
        payment_method: body.payment_method,
        recieve: body.recieve,
        return: Number.parseFloat(body.return == 0 ? "0" : body.return),
        remark: body.remark,
        pay_date: body.pay_date,
      };

      const order = await prismadb.order.create({
        data: order_data,
      });

      const order_detail = body.order.map((data: any) => {
        return {
          product_id: data.product.id,
          amount: data.amount,
          price: data.product.price,
          unit: data.product.unit,
          order_id: order.id,
        };
      });

      await prismadb.orderDetail.createMany({
        data: order_detail,
      });

      const update_stock = order_detail.map((data: any) => {
        return {
          product_id: data.product_id,
          amount: data.amount,
          multiplier: -1,
        };
      });

      Promise.all(
        update_stock.map(async (item: any) => {
          await prismadb.stock.updateMany({
            where: {
              AND: [{ product_id: item.product_id }, { amount: { gt: 0 } }],
            },
            data: { amount: { increment: item.amount * item.multiplier } },
          });
        })
      );

      return NextResponse.json(order);
    }
    return NextResponse.json({ error: "No order create" }, { status: 500 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    if (body) {
      const over_stock = await Promise.all(
        body.order.map(async (item: any) => {
          const check_stock = await prismadb.category.findFirst({
            where: { name: "สินค้า" },
            include: {
              Product: {
                include: {
                  stock: {
                    where: {
                      AND: [
                        { product_id: item.product.id },
                        { amount: { lt: item.amount } },
                      ],
                    },
                  },
                },
              },
            },
          });

          if (check_stock?.Product[0]?.stock?.length ?? 0 > 0) {
            const product = await prismadb.product.findUnique({
              where: { id: item.product.id },
            });

            return product;
          }
          return null;
        })
      );

      if (over_stock.filter((f) => f != null).length > 0) {
        return NextResponse.json(
          `${over_stock.filter((f) => f != null)[0].name ?? ""} over stock`,
          {
            status: 500,
          }
        );
      }
    }

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const student = await prismadb.students.delete({
      where: { id: id },
    });

    if (student.image_id) {
      await axios.delete(`/api/image/?id=${student.image_id}`);
    }

    return NextResponse.json(student);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
