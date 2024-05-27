import prismadb from "@/lib/prismadb";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? undefined;
    if (id) {
      const classRooms = await prismadb.classRoom.findUnique({
        where: { id: id },
        include: { teacher: true },
      });
      return NextResponse.json(classRooms);
    } else {
      const classRooms = await prismadb.classRoom.findMany({
        include: { teacher: true },
      });
      return NextResponse.json(classRooms);
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const classRoom = await prismadb.classRoom.create({
      data: body,
    });
    return NextResponse.json(classRoom);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const body = await req.json();
    const classRoom = await prismadb.classRoom.update({
      where: { id: id },
      data: body,
    });
    return NextResponse.json(classRoom);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const classRoom = await prismadb.classRoom.delete({
      where: { id: id },
    });

    return NextResponse.json(classRoom);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
