import prismadb from "@/lib/prismadb";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? undefined;
    if (id) {
      const trips = await prismadb.trip.findUnique({
        where: { id: id },
      });
      return NextResponse.json(trips);
    } else {
      const trips = await prismadb.trip.findMany({});
      return NextResponse.json(trips);
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const trip = await prismadb.trip.create({
      data: body,
    });
    return NextResponse.json(trip);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const body = await req.json();
    const trip = await prismadb.trip.update({
      where: { id: id },
      data: body,
    });
    return NextResponse.json(trip);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const trip = await prismadb.trip.delete({
      where: { id: id },
    });

    return NextResponse.json(trip);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
