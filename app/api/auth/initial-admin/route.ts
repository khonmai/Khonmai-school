import prismadb from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await prismadb.user.create({
      data: {
        username: "admin",
        password: await bcrypt.hash("admin", 10),
        name: "administator",
      },
    });


    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
