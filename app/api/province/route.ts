import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const provinces = await prismadb.provinces.findMany();
    return NextResponse.json(provinces);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
