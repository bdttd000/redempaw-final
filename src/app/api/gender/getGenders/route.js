import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function GET() {
  try {
    const genders = await prisma.gender.findMany({
      select: {
        gender_id: true,
        name: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        genders,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        error: `getGenders error: ${err.message}`,
      }),
      { status: 500 }
    );
  }
}
