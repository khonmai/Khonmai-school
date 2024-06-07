import prismadb from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const check_user = await prismadb.user.findUnique({
      where: { id: body.id },
    });

    const passwordMatch = await bcrypt.compare(
      check_user?.password!,
      await bcrypt.hash(body.oldpassword, 10)
    );

    if (!check_user && !passwordMatch)
      return NextResponse.json(
        { message: "oldpassword invalid" },
        { status: 500 }
      );

    const user = await prismadb.user.update({
      where: { id: body.id },
      data: {
        password: await bcrypt.hash(body.newpassword, 10),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
