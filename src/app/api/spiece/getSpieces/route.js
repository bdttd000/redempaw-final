import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function GET() {
  try {
    const spieces = await prisma.spiece.findMany({
      select: {
        spiece_id: true,
        name: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        spieces,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        error: `getSpieces error: ${err.message}`,
      }),
      { status: 500 }
    );
  }
}
