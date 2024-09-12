import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      name,
      description,
      status_id,
      activity_id,
      age_id,
      breed,
      gender_id,
      spiece_id,
      mainPhotoUrl,
      subPhotosUrl,
      city_id,
      userId,
    } = data;

    const newPetInfo = await prisma.pet_info.create({
      data: {
        name: name,
        description: description,
        breed: breed,
        avatar_url: mainPhotoUrl,
        status: { connect: { status_id: +status_id } },
        activity: { connect: { activity_id: +activity_id } },
        age: { connect: { age_id: +age_id } },
        gender: { connect: { gender_id: +gender_id } },
        spiece: { connect: { spiece_id: +spiece_id } },
        photos: {
          createMany: {
            data: subPhotosUrl.map((photoUrl) => ({
              photo_url: photoUrl,
            })),
          },
        },
      },
    });

    const newPet = await prisma.pet.create({
      data: {
        user: { connect: { user_id: userId } },
        pet_info: { connect: { pet_info_id: newPetInfo.pet_info_id } },
      },
    });

    await prisma.pet_city.create({
      data: {
        pet_id: newPet.pet_id,
        city_id: +city_id,
      },
    });

    return new NextResponse(
      JSON.stringify({
        newPet,
        newPetInfo,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error while creating pet:", err);

    return new NextResponse(
      JSON.stringify({
        error: "Błąd podczas tworzenia zwierzęcia.",
      }),
      { status: 500 }
    );
  }
}
