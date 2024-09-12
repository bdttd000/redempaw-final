import React from "react";
import Link from "next/link";
import { useMakeTranslation } from "@/app/utils/translation/translate";

export default function Footer() {
  const t = useMakeTranslation();

  return (
    <div className="grey-bg text-white overflow-hidden">
      <ul className="flex flex-row flex-wrap justify-around items-center max-w-3xl m-auto px-4 min-h-fit">
        <li className="py-4 px-2">
          <Link href="/statute">
            <h5>{t("layout.termsOfService", true)}</h5>
          </Link>
        </li>
        <li className="py-4 px-2">
          <Link href="/contact">
            <h5>{t("layout.contact", true)}</h5>
          </Link>
        </li>
        <li className="py-4 px-2">
          <Link href="/privacyPolicy">
            <h5>{t("layout.privacyPolicy", true)}</h5>
          </Link>
        </li>
      </ul>
    </div>
  );
}
