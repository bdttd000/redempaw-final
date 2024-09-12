import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function GET() {
  try {
    const cities = await prisma.city.findMany({
      select: {
        city_id: true,
        name: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        cities,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        error: `getCities error: ${err.message}`,
      }),
      { status: 500 }
    );
  }
}
