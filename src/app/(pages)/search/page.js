"use client";

import { PageSection } from "@/app/components/shared/layout";
import { FilterForm } from "@/app/components/search/FilterForm";
import { PetList } from "@/app/components/search/PetList";
import styles from "./styles.scss";
import { useMakeTranslation } from "@/app/utils/translation/translate";

export default function Page() {
  const t = useMakeTranslation();

  return (
    <div className="flex flex-col w-full">
      <PageSection title={t("layout.search", true)} primary>
        <div className="flex flex-row flex-wrap search__container">
          <div className="primary-bg-light flex flex-nowrap justify-center items-center min-w-96 flex-1 h-fit">
            <FilterForm />
          </div>
          <div className="flex-2">
            <PetList />
          </div>
        </div>
      </PageSection>
    </div>
  );
}
