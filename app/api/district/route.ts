import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const province_code = Number(
      req.nextUrl.searchParams.get("province_code") ?? "0"
    );

    const district = await prismadb.district.findMany({
      where: { province_code: province_code },
    });

    return NextResponse.json(district);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
