"use client";

import { PageSection } from "@/app/components/shared/layout";
import { useMakeTranslation } from "@/app/utils/translation/translate";

export default function Home() {
  const t = useMakeTranslation();

  return (
    <div className="flex flex-col w-full">
      <PageSection title={t("errors.petInfoNotFound", true)} primary={true} />
    </div>
  );
}
