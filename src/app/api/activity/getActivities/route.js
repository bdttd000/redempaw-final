import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function GET() {
  try {
    const activities = await prisma.activity.findMany({
      select: {
        activity_id: true,
        name: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        activities,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        error: `getActivities error: ${err.message}`,
      }),
      { status: 500 }
    );
  }
}
