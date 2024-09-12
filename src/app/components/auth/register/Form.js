"use client";
import React, { useEffect, useState } from "react";
import { Input, Redirect, Select, Submit } from "@/components/shared/form";
import { useMakeTranslation } from "@/app/utils/translation/translate";
import { getActiveLanguage } from "@/app/utils/helpers";
import Preloader from "../../shared/preloader/Preloader";
import { map } from "lodash";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  getLanguages,
  selectLanguages,
} from "@/lib/redux/features/language/languageSlice";
import { registerValidation } from "@/app/utils/registerValidation";
import { createUser } from "@/lib/redux/features/user/userSlice";

export default function Form() {
  const t = useMakeTranslation();
  const activeLanguage = getActiveLanguage();
  const [registerData, setRegisterData] = useState({
    name: "",
    surname: "",
    email: "",
    password1: "",
    password2: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState(null);

  const dispatch = useAppDispatch();

  const { i18n } = useTranslation();
  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    dispatch(getLanguages());
  }, [dispatch]);

  const languages = useAppSelector(selectLanguages);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!registerValidation(registerData, setError)) {
      return;
    }

    dispatch(createUser({ registerData, setError }));
  };

  if (!languages.languages.length || !activeLanguage) {
    <Preloader />;
  }

  return (
    <form
      className="md:flex-1 flex flex-col justify-center items-center gap-4"
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="text-red-600 text-xl">
          {t(`formValidation.${error}`, true)}
        </div>
      )}
      <Select
        onChange={(e) => handleChangeLanguage(e.target.value)}
        value={activeLanguage}
      >
        {map(languages.languages, (language) => (
          <option key={language.code} value={language.code}>
            {t(`languages.${language.code}`, true)}
          </option>
        ))}
      </Select>
      <Input
        type="text"
        name="name"
        placeholder={t("form.name", true)}
        value={registerData.name}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        name="surname"
        placeholder={t("form.surname", true)}
        value={registerData.surname}
        onChange={handleInputChange}
      />
      <Input
        type="email"
        name="email"
        placeholder={t("form.email", true)}
        value={registerData.email}
        onChange={handleInputChange}
      />
      <Input
        type="password"
        name="password1"
        placeholder={t("form.password", true)}
        value={registerData.password1}
        onChange={handleInputChange}
      />
      <Input
        type="password"
        name="password2"
        placeholder={t("form.password2", true)}
        value={registerData.password2}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        name="phone"
        placeholder={t("form.phone", true)}
        value={registerData.phone}
        onChange={handleInputChange}
      />
      <Input
        type="text"
        name="address"
        placeholder={t("form.address", true)}
        value={registerData.address}
        onChange={handleInputChange}
      />
      <Submit text={t("form.register", true)} />
      <Redirect href="/login" text={t("form.login", true)} />
    </form>
  );
}
