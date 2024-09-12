import React, { useEffect } from "react";
import logo from "@/public/assets/logo.svg";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useMakeTranslation } from "@/app/utils/translation/translate";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { getLanguages } from "@/lib/redux/features/language/languageSlice";
import { selectLanguages } from "@/lib/redux/features/language/languageSlice";
import { getActiveLanguage } from "@/app/utils/helpers";
import Preloader from "../preloader/Preloader";
import HeaderDropdown from "./HeaderDropdown";

export default function Header() {
  const t = useMakeTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLanguages());
  }, [dispatch]);

  const languages = useAppSelector(selectLanguages);
  const activeLanguage = getActiveLanguage();

  if (!languages.languages.length || !activeLanguage) {
    <Preloader />;
  }

  return (
    <div className="grey-bg text-white">
      <div className="flex flex-row justify-between items-center main-max-width m-auto px-4 h-16 ">
        <Link className="flex items-center h-full sm:text-2xl" href="/">
          <Image
            priority
            src={logo}
            className="logo-filter h-4/5 w-auto mr-4"
            alt="Logo"
          />
          <span className="hidden sm:block">REDEM</span>
          <span className="text-secondary hidden sm:block">PAW</span>
        </Link>
        <div className="flex flex-row gap-10">
          <Link href="/add-pet">
            <h5>{t("layout.addPet", true)}</h5>
          </Link>

          <Link href="/search">
            <h5>{t("layout.search", true)}</h5>
          </Link>

          <Link href="/profile">
            <h5>{t("layout.profile", true)}</h5>
          </Link>
        </div>
        <span className="flex flex-row h-full items-center">
          <HeaderDropdown
            languages={languages}
            activeLanguage={activeLanguage}
          />
          <span
            className="flex items-center h-full sm:text-xl cursor-pointer"
            onClick={() => signOut()}
          >
            {t("layout.logout", true)}
          </span>
        </span>
      </div>
    </div>
  );
}
