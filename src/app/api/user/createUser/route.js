import { formValidation } from "@/app/constants/constants";
import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";
import { hash } from "@/app/utils/helpers";

export async function POST(req) {
  try {
    const { name, surname, email, password1, phone, address } =
      await req.json();

    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({
          error: formValidation.userAlreadtExists,
        }),
        { status: 400 }
      );
    }

    const passwordHash = hash(password1, 12);

    const newUser = await prisma.users.create({
      data: {
        privilege: {
          connect: { privilege_id: 2 },
        },
        user_info: {
          create: {
            name: name,
            surname: surname,
            phone: phone,
            address: address,
          },
        },
        email: email,
        password: passwordHash,
      },
    });

    return new NextResponse(
      JSON.stringify({
        newUser,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        error: "Error while creating user",
      }),
      { status: 500 }
    );
  }
}
