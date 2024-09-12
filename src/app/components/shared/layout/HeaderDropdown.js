import React, { useState } from "react";
import gear from "@/public/assets/gear.svg";
import Image from "next/image";
import { map } from "lodash";
import { useMakeTranslation } from "@/app/utils/translation/translate";
import { useTranslation } from "react-i18next";

export default function HeaderDropdown({ languages, activeLanguage }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useMakeTranslation();

  const { i18n } = useTranslation();
  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative text-left flex flex-row items-center justify-center h-full">
      <Image
        priority
        src={gear}
        className="h-3/5 w-auto icon-white cursor-pointer mr-4"
        alt="Gear"
        onClick={toggleDropdown}
      />
      {isOpen && (
        <div className="absolute mt-40 w-48 bg-white border border-gray-300  rounded shadow-lg z-50">
          {map(languages.languages, (language) => (
            <a
              key={language.code}
              href="#"
              className={`block px-4 py-2 text-gray-800 hover:bg-orange-200 ${
                language.code === activeLanguage ? "light-bg" : ""
              }`}
              onClick={() => {
                handleChangeLanguage(language.code);
                toggleDropdown();
              }}
            >
              {t(`languages.${language.code}`, true)}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
