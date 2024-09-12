-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "privilege_id" INTEGER NOT NULL,
    "user_info_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_info" (
    "user_info_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "user_info_pkey" PRIMARY KEY ("user_info_id")
);

-- CreateTable
CREATE TABLE "privilege" (
    "privilege_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "privilege_pkey" PRIMARY KEY ("privilege_id")
);

-- CreateTable
CREATE TABLE "pet" (
    "pet_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "pet_info_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pet_pkey" PRIMARY KEY ("pet_id")
);

-- CreateTable
CREATE TABLE "pet_info" (
    "pet_info_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "directory_url" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "status_id" INTEGER NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "age_id" INTEGER NOT NULL,
    "breed" TEXT NOT NULL,
    "spiece_id" INTEGER NOT NULL,
    "gender_id" INTEGER NOT NULL,

    CONSTRAINT "pet_info_pkey" PRIMARY KEY ("pet_info_id")
);

-- CreateTable
CREATE TABLE "spiece" (
    "spiece_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "spiece_pkey" PRIMARY KEY ("spiece_id")
);

-- CreateTable
CREATE TABLE "status" (
    "status_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("status_id")
);

-- CreateTable
CREATE TABLE "activity" (
    "activity_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("activity_id")
);

-- CreateTable
CREATE TABLE "age" (
    "age_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "age_pkey" PRIMARY KEY ("age_id")
);

-- CreateTable
CREATE TABLE "gender" (
    "gender_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "gender_pkey" PRIMARY KEY ("gender_id")
);

-- CreateTable
CREATE TABLE "photo" (
    "photo_id" TEXT NOT NULL,
    "pet_info_id" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,

    CONSTRAINT "photo_pkey" PRIMARY KEY ("photo_id")
);

-- CreateTable
CREATE TABLE "city" (
    "city_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "pet_city" (
    "pet_id" TEXT NOT NULL,
    "city_id" INTEGER NOT NULL,

    CONSTRAINT "pet_city_pkey" PRIMARY KEY ("pet_id","city_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_info_id_key" ON "users"("user_info_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pet_pet_info_id_key" ON "pet"("pet_info_id");

-- CreateIndex
CREATE UNIQUE INDEX "spiece_name_key" ON "spiece"("name");

-- CreateIndex
CREATE UNIQUE INDEX "status_name_key" ON "status"("name");

-- CreateIndex
CREATE UNIQUE INDEX "activity_name_key" ON "activity"("name");

-- CreateIndex
CREATE UNIQUE INDEX "age_name_key" ON "age"("name");

-- CreateIndex
CREATE UNIQUE INDEX "gender_name_key" ON "gender"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_privilege_id_fkey" FOREIGN KEY ("privilege_id") REFERENCES "privilege"("privilege_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_info_id_fkey" FOREIGN KEY ("user_info_id") REFERENCES "user_info"("user_info_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet" ADD CONSTRAINT "pet_pet_info_id_fkey" FOREIGN KEY ("pet_info_id") REFERENCES "pet_info"("pet_info_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_info" ADD CONSTRAINT "pet_info_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("status_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_info" ADD CONSTRAINT "pet_info_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activity"("activity_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_info" ADD CONSTRAINT "pet_info_age_id_fkey" FOREIGN KEY ("age_id") REFERENCES "age"("age_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_info" ADD CONSTRAINT "pet_info_spiece_id_fkey" FOREIGN KEY ("spiece_id") REFERENCES "spiece"("spiece_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_info" ADD CONSTRAINT "pet_info_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "gender"("gender_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo" ADD CONSTRAINT "photo_pet_info_id_fkey" FOREIGN KEY ("pet_info_id") REFERENCES "pet_info"("pet_info_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_city" ADD CONSTRAINT "pet_city_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pet"("pet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_city" ADD CONSTRAINT "pet_city_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "city"("city_id") ON DELETE RESTRICT ON UPDATE CASCADE;
