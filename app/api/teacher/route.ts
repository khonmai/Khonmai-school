import prismadb from "@/lib/prismadb";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

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
    const user = await prismadb.user.create({
      data: {
        username: body.teacher_no,
        password: await bcrypt.hash("password", 10),
        name: `${body.f_name} ${body.l_name}`,
      },
    });

    const teacher = await prismadb.teacher.create({
      data: { ...body, user_id: user.id },
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

    const check_user = await prismadb.user.findFirst({
      where: { username: body.teacher_no },
    });

    let user_id = "";
    if (!check_user) {
      const user = await prismadb.user.create({
        data: {
          username: body.teacher_no,
          password: await bcrypt.hash("password", 10),
          name: `${body.f_name} ${body.l_name}`,
        },
      });
      user_id = user.id;
    } else {
       await prismadb.user.update({
        where: { id: check_user.id },
        data: {
          name: `${body.f_name} ${body.l_name}`,
        },
      });
    }

    const teacher = await prismadb.teacher.update({
      where: { id: id },
      data: { ...body, user_id: user_id },
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

    const user = await prismadb.user.update({
      where: { username: teacher.teacher_no },
      data: { isActive: false },
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
