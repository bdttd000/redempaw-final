"use client";
import React, { useEffect, useState } from "react";
import { Input, Redirect, Select, Submit } from "@/components/shared/form";
import { signIn } from "next-auth/react";
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
import { formValidation } from "@/app/constants/constants";
import { useRouter } from "next/navigation";

export default function Form() {
  const t = useMakeTranslation();
  const router = useRouter();
  const activeLanguage = getActiveLanguage();
  const [registerData, registerDataData] = useState({
    email: "",
    password: "",
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
    registerDataData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await signIn("credentials", {
      email: registerData.email,
      password: registerData.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (response.ok) {
      router.push("/");
    } else {
      setError(formValidation.loginFailed);
    }
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
        type="email"
        name="email"
        placeholder={t("form.email", true)}
        value={registerData.email}
        onChange={handleInputChange}
      />
      <Input
        type="password"
        name="password"
        placeholder={t("form.password", true)}
        value={registerData.password}
        onChange={handleInputChange}
      />
      <Submit text={t("form.login", true)} />
      <Redirect href="/register" text={t("form.register", true)} />
    </form>
  );
}
