import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const district_code = Number(
      req.nextUrl.searchParams.get("district_code") ?? "0"
    );

    const subdistrict = await prismadb.subdistrict.findMany({
      where: { district_code: district_code },
    });

    return NextResponse.json(subdistrict);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
