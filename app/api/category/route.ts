import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? undefined;
    if (id) {
      const categorys = await prismadb.category.findUnique({
        where: { id: id },
      });
      return NextResponse.json(categorys);
    } else {
      const categorys = await prismadb.category.findMany({});
      return NextResponse.json(categorys);
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const category = await prismadb.category.create({
      data: body,
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const body = await req.json();
    const category = await prismadb.category.update({
      where: { id: id },
      data: body,
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const category = await prismadb.category.delete({
      where: { id: id },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
