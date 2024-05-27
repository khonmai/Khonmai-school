import prismadb from "@/lib/prismadb";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? undefined;
    if (id) {
      const teachers = await prismadb.teacher.findUnique({
        where: { id: id },
        include: {
          image: true,
        },
      });
      return NextResponse.json(teachers);
    } else {
      const teachers = await prismadb.teacher.findMany({
        include: {
          image: true,
        },
      });
      return NextResponse.json(teachers);
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const teacher = await prismadb.teacher.create({
      data: body,
    });
    return NextResponse.json(teacher);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const body = await req.json();
    const teacher = await prismadb.teacher.update({
      where: { id: id },
      data: body,
    });
    return NextResponse.json(teacher);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const teacher = await prismadb.teacher.delete({
      where: { id: id },
    });

    if (teacher.image_id) {
      await axios.delete(`/api/image/?id=${teacher.image_id}`);
    }

    return NextResponse.json(teacher);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
