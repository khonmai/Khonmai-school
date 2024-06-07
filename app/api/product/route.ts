import prismadb from "@/lib/prismadb";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? undefined;
    const filter = req.nextUrl.searchParams.get("filter") ?? undefined;

    if (id) {
      const products = await prismadb.product.findUnique({
        where: { id: id },
        include: { category: true, stock: true },
      });
      return NextResponse.json(products);
    }

    // if (filter) {
    //   const products = await prismadb.product.findMany({
    //     include: { category: true, stock: { where: { amount: { not: 0 } } } },
    //   });
    //   return NextResponse.json(products);
    // }

    const products = await prismadb.product.findMany({
      include: { category: true, stock: true },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const productData = { ...body };
    delete productData.amount;

    const product = await prismadb.product.create({
      data: productData,
    });

    const stock = await prismadb.stock.create({
      data: {
        product_id: product.id,
        amount: parseFloat(body.amount ?? "0"),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const body = await req.json();

    const product = await prismadb.product.update({
      where: { id: id },
      data: body,
    });

    const stock = await prismadb.stock.findFirst({
      where: { product_id: product.id },
    });

    if (!stock) {
      await prismadb.stock.create({
        data: {
          product_id: product.id,
          amount: 0,
        },
      });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const product = await prismadb.product.delete({
      where: { id: id },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
