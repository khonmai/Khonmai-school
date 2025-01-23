import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const date = new Date(req.nextUrl.searchParams.get("date") ?? "");
    const date_start = new Date(date);
    const date_temp = new Date(date.setMonth(date.getMonth() + 1));
    const date_end = new Date(date_temp.setDate(date_temp.getDate() - 1));

    const monthly = await prismadb.order.findMany({
      where: { is_paid: true, createdAt: { gte: date_start, lte: date_end } },
      include: {
        student: true,
        OrderDetail: {
          include: { product: true },
        },
      },
    });



    return NextResponse.json(monthly);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
