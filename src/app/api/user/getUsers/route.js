import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function GET() {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    return new NextResponse(
      JSON.stringify({
        users,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        error: `getUsers error: ${err.message}`,
      }),
      { status: 500 }
    );
  }
}
