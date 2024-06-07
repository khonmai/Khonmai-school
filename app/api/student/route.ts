import prismadb from "@/lib/prismadb";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
// import { deleteImage } from "../image/route";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? undefined;
    const student_no = req.nextUrl.searchParams.get("student_no") ?? undefined;
    if (id) {
      const students = await prismadb.students.findUnique({
        where: { id: id },
        include: {
          classroom: true,
          image: true,
        },
      });
      return NextResponse.json(students);
    }

    if (student_no) {
      const students = await prismadb.students.findUnique({
        where: { student_no: student_no },
        include: {
          classroom: true,
          image: true,
        },
      });
      return NextResponse.json(students);
    }

    const students = await prismadb.students.findMany({
      include: {
        classroom: true,
        image: true,
      },
    });
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const student = await prismadb.students.create({
      data: body,
    });
    return NextResponse.json(student);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const body = await req.json();
    const student = await prismadb.students.update({
      where: { id: id },
      data: body,
    });
    return NextResponse.json(student);
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
      // await deleteImage(student.image_id);
    }

    return NextResponse.json(student);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
