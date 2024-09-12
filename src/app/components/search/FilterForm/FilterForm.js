import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPets, selectPetState } from "@/redux/features/pet/petSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  getCitites,
  selectCities,
} from "@/lib/redux/features/city/citiesSlice";
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
import { useMakeTranslation } from "@/app/utils/translation/translate";
import { Select } from "../../shared/form";
import { map } from "lodash";

const FilterForm = () => {
  const t = useMakeTranslation();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    city: "",
    status: "",
    spiece: "",
    gender: "",
    age: "",
    activity: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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

  console.log(spieces);

  const pets = useAppSelector(selectPetState);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log("elo");
    dispatch(getPets({ filters: formData }));
  }, [formData, dispatch]);

  return (
    <div className="p-4">
      <form className="space-y-4">
        <Select
          type="text"
          name="city"
          defaultValue={formData.city}
          onChange={(e) => handleInputChange("city", e.target.value)}
          noResize
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
          name="status"
          defaultValue={formData.status}
          onChange={(e) => handleInputChange("status", e.target.value)}
          noResize
        >
          <option value="">{t("form.addPet.status", true)}</option>
          {map(statuses, (status) => (
            <option key={status.status} value={status.status_id}>
              {t(`status.${status.name}`, true)}
            </option>
          ))}
        </Select>
        <Select
          type="text"
          name="spiece"
          defaultValue={formData.spiece}
          onChange={(e) => handleInputChange("spiece", e.target.value)}
          noResize
        >
          <option value="">{t("form.addPet.spiece", true)}</option>
          {map(spieces, (spiece) => (
            <option key={spiece.spiece} value={spiece.spiece_id}>
              {t(`spieces.${spiece.name}`, true)}
            </option>
          ))}
        </Select>
        <Select
          type="text"
          name="gender"
          defaultValue={formData.gender}
          onChange={(e) => handleInputChange("gender", e.target.value)}
          noResize
        >
          <option value="">{t("form.addPet.gender", true)}</option>
          {map(genders, (gender) => (
            <option key={gender.gender} value={gender.gender_id}>
              {t(`gender.${gender.name}`, true)}
            </option>
          ))}
        </Select>
        <Select
          type="text"
          name="age"
          defaultValue={formData.age}
          onChange={(e) => handleInputChange("age", e.target.value)}
          noResize
        >
          <option value="">{t("form.addPet.age", true)}</option>
          {map(ages, (age) => (
            <option key={age.age} value={age.age_id}>
              {t(`age.${age.name}`, true)}
            </option>
          ))}
        </Select>
        <Select
          type="text"
          name="activity"
          defaultValue={formData.activity}
          onChange={(e) => handleInputChange("activity", e.target.value)}
          noResize
        >
          <option value="">{t("form.addPet.activity", true)}</option>
          {map(activities, (activity) => (
            <option key={activity.activity} value={activity.activity_id}>
              {t(`activity.${activity.name}`, true)}
            </option>
          ))}
        </Select>
      </form>
    </div>
  );
};

export default FilterForm;
