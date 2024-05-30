import prismadb from "@/lib/prismadb";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { promise } from "zod";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? undefined;

    const stock = await prismadb.category.findMany({
      where: { name: "สินค้า" },
      include: {
        Product: { include: { stock: true } },
      },
    });
    return NextResponse.json(stock);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const stock = await prismadb.stock.updateMany({
      where: { product_id: body.product_id },
      data: { amount: { increment: body.amount * body.multiplier } },
    });

    return NextResponse.json(stock);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const body = await req.json();
    const stock = await prismadb.stock.update({
      where: { id: id },
      data: body,
    });
    return NextResponse.json(stock);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const stock = await prismadb.stock.delete({
      where: { id: id },
    });

    return NextResponse.json(stock);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
