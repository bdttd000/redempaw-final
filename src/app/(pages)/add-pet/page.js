"use client";

import {
  Input,
  UploadPhoto,
  Submit,
  Select,
  Textarea,
} from "@/app/components/shared/form";
import { useMakeTranslation } from "@/app/utils/translation/translate";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PageSection } from "@/app/components/shared/layout";
import styles from "./styles.scss";
import config from "./config.json";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  getCitites,
  selectCities,
} from "@/lib/redux/features/city/citiesSlice";
import Preloader from "@/app/components/shared/preloader/Preloader";
import { map } from "lodash";
import { createPet } from "@/lib/redux/features/pet/petSlice";
import {
  getSpieces,
  selectSpieces,
} from "@/lib/redux/features/spiece/spieceSlice";
import { getAges, selectAges } from "@/lib/redux/features/age/ageSlice";
import {
  getGenders,
  selectGenders,
} from "@/lib/redux/features/gender/genderSlice";
import {
  getStatuses,
  selectStatuses,
} from "@/lib/redux/features/status/statusSlice";
import {
  getActivities,
  selectActivities,
} from "@/lib/redux/features/activity/activitySlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const t = useMakeTranslation(config.prefix);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const userId = session.user.id;
  const router = useRouter();

  useEffect(() => {
    dispatch(getCitites());
    dispatch(getSpieces());
    dispatch(getAges());
    dispatch(getGenders());
    dispatch(getStatuses());
    dispatch(getActivities());
  }, [dispatch]);

  const cities = useAppSelector(selectCities);
  const spieces = useAppSelector(selectSpieces);
  const ages = useAppSelector(selectAges);
  const genders = useAppSelector(selectGenders);
  const statuses = useAppSelector(selectStatuses);
  const activities = useAppSelector(selectActivities);

  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
    city_id: "",
    status_id: "",
    spiece_id: "",
    breed: "",
    gender_id: "",
    age_id: "",
    activity_id: "",
    creationDate: new Date().toISOString().split("T")[0],
    updateDate: new Date().toISOString().split("T")[0],
    description: "",
    address: "",
    mainPhotoUrl: "",
    subPhotosUrl: [],
    avatar: [],
    additionalPhotos: [],
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const uploadFile = async (file, imageId, directory) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("imageId", imageId);
    formData.append("directory", directory);

    try {
      const response = await fetch("/api/shared/uploadPhoto", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.filePath;
      } else {
        throw new Error("Błąd przesyłania pliku.");
      }
    } catch (error) {
      console.error("Błąd podczas przesyłania:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    let updatedFormData = { ...formData }; // Tworzymy kopię danych

    if (formData.avatar.length > 0) {
      const avatarFilePath = await uploadFile(
        formData.avatar[0],
        uuidv4(),
        "avatars"
      );
      updatedFormData.mainPhotoUrl = avatarFilePath;
    }

    if (formData.additionalPhotos.length > 0) {
      const subPhotoUrls = await Promise.all(
        formData.additionalPhotos.map(async (file) => {
          return await uploadFile(file, uuidv4(), "additional-photos");
        })
      );
      updatedFormData.subPhotosUrl = subPhotoUrls.filter((url) => url !== null);
    }

    setFormData(updatedFormData);

    if (updatedFormData.mainPhotoUrl) {
      dispatch(
        createPet({ formData: updatedFormData, userId: userId, setError })
      );
      router.push("/");
    }

    setLoading(false);
  };

  if (!cities.length || loading) {
    return <Preloader />;
  }

  return (
    <div className="flex flex-col w-full">
      <PageSection title={t("title")} primary>
        <form
          className="add-pet__form flex-wrap lg:flex-nowrap"
          onSubmit={handleSubmit}
        >
          <div className="add-pet__form--content">
            <Input
              type="text"
              name="name"
              placeholder={t("form.addPet.name", true)}
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="border p-2"
            />
            <Select
              type="text"
              name="city_id"
              fdgh
              defaultValue={formData.city_id}
              onChange={(e) => handleInputChange("city_id", e.target.value)}
              className="border p-2"
            >
              <option value="">{t("form.addPet.city", true)}</option>
              {map(cities, (city) => (
                <option key={city.name} value={city.city_id}>
                  {city.name}
                </option>
              ))}
            </Select>
            <Select
              type="text"
              name="status_id"
              defaultValue={formData.status_id}
              onChange={(e) => handleInputChange("status_id", e.target.value)}
              className="border p-2"
            >
              <option value="">{t("form.addPet.status", true)}</option>
              {map(statuses, (status) => (
                <option key={status.status_id} value={status.status_id}>
                  {t(`status.${status.name}`, true)}
                </option>
              ))}
            </Select>
            <Select
              type="text"
              name="spiece_id"
              defaultValue={formData.spiece_id}
              onChange={(e) => handleInputChange("spiece_id", e.target.value)}
              className="border p-2"
            >
              <option value="">{t("form.addPet.spiece", true)}</option>
              {map(spieces, (spiece) => (
                <option key={spiece.spiece_id} value={spiece.spiece_id}>
                  {t(`spieces.${spiece.name}`, true)}
                </option>
              ))}
            </Select>
            <Input
              type="text"
              name="breed"
              placeholder={t("form.addPet.breed", true)}
              value={formData.breed}
              onChange={(e) => handleInputChange("breed", e.target.value)}
              className="border p-2"
            />
            <Select
              type="text"
              name="gender_id"
              defaultValue={formData.gender_id}
              onChange={(e) => handleInputChange("gender_id", e.target.value)}
              className="border p-2"
            >
              <option value="">{t("form.addPet.gender", true)}</option>
              {map(genders, (gender) => (
                <option key={gender.gender_id} value={gender.gender_id}>
                  {t(`gender.${gender.name}`, true)}
                </option>
              ))}
            </Select>
            <Select
              type="text"
              name="age_id"
              defaultValue={formData.age_id}
              onChange={(e) => handleInputChange("age_id", e.target.value)}
              className="border p-2"
            >
              <option value="">{t("form.addPet.age", true)}</option>
              {map(ages, (age) => (
                <option key={age.age_id} value={age.age_id}>
                  {t(`age.${age.name}`, true)}
                </option>
              ))}
            </Select>
            <Select
              type="text"
              name="activity_id"
              defaultValue={formData.activity_id}
              onChange={(e) => handleInputChange("activity_id", e.target.value)}
              className="border p-2"
            >
              <option value="">{t("form.addPet.activity", true)}</option>
              {map(activities, (activity) => (
                <option key={activity.activity_id} value={activity.activity_id}>
                  {t(`activity.${activity.name}`, true)}
                </option>
              ))}
            </Select>
            <Textarea
              type="text"
              name="description"
              placeholder={t("form.addPet.description", true)}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="border p-2"
            />
            <Input
              type="text"
              name="address"
              placeholder={t("form.addPet.address", true)}
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              className="border p-2"
            />
            <Submit text={t("buttons.send", true)}></Submit>
          </div>
          <div className="add-pet__form--content">
            <UploadPhoto
              title={t("form.addPet.addAvatar", true)}
              handler={handleInputChange}
              value={formData.avatar}
              field="avatar"
            />
            <UploadPhoto
              title={t("form.addPet.addAdditionalPhotos", true)}
              handler={handleInputChange}
              value={formData.additionalPhotos}
              field="additionalPhotos"
              multiple
            />
          </div>
        </form>
      </PageSection>
    </div>
  );
}
