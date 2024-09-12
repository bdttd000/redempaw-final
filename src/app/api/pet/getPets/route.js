import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const status = searchParams.get("status");
    const activity = searchParams.get("activity");
    const age = searchParams.get("age");
    const gender = searchParams.get("gender");
    const spiece = searchParams.get("spiece");
    const city = searchParams.get("city");

    const offset = (page - 1) * limit;

    const filters = {};

    if (status) filters.status = { status_id: +status };
    if (activity) filters.activity = { activity_id: +activity };
    if (age) filters.age = { age_id: +age };
    if (gender) filters.gender = { gender_id: +gender };
    if (spiece) filters.spiece = { spiece_id: +spiece };

    const cityFilter = city
      ? {
          pet_city: {
            city_id: +city,
          },
        }
      : {};

    const pets = await prisma.pet_info.findMany({
      skip: offset,
      take: limit,
      where: {
        AND: [filters, cityFilter],
      },
      include: {
        status: true,
        activity: true,
        age: true,
        gender: true,
        spiece: true,
        photos: true,
        pet: {
          include: {
            pet_city: {
              include: {
                city: true,
              },
            },
          },
        },
      },
    });

    const formattedPets = pets.map((pet) => ({
      id: pet.pet_info_id,
      name: pet.name,
      description: pet.description,
      breed: pet.breed,
      avatarUrl: pet.avatar_url,
      status: pet.status.name,
      activity: pet.activity.name,
      age: pet.age.name,
      gender: pet.gender.name,
      spiece: pet.spiece.name,
      city: pet.pet?.pet_city[0]?.city.name || null,
      photos: pet.photos.map((photo) => photo.photo_url),
    }));

    const totalPets = await prisma.pet_info.count({
      where: {
        AND: [filters, cityFilter],
      },
    });

    return new NextResponse(
      JSON.stringify({
        pets: formattedPets,
        totalPages: Math.ceil(totalPets / limit),
        currentPage: page,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching pets:", error);
    return new NextResponse(
      JSON.stringify({ error: "Błąd podczas zaczytywania zwierząt." }),
      { status: 500 }
    );
  }
}
