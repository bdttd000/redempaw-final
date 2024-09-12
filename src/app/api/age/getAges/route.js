import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function GET() {
  try {
    const ages = await prisma.age.findMany({
      select: {
        age_id: true,
        name: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        ages,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        error: `getAges error: ${err.message}`,
      }),
      { status: 500 }
    );
  }
}
