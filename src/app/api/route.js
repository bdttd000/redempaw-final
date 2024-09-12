import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prismaClient";

export async function POST(req) {
  try {
    const { name, email } = await req.json();

    // Walidacja danych
    if (!name || !email) {
      return new NextResponse(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400 }
      );
    }

    // Tworzenie użytkownika
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        error: `Wystąpił błąd podczas tworzenia użytkownika: ${err.message}`,
      }),
      { status: 500 }
    );
  }
}
