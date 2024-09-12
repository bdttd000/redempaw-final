import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function GET() {
  try {
    const statuses = await prisma.status.findMany({
      select: {
        status_id: true,
        name: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        statuses,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        error: `getStatuses error: ${err.message}`,
      }),
      { status: 500 }
    );
  }
}
