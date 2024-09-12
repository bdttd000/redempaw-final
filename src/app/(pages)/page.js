"use client";

import React, { useEffect, useState } from "react";
import Card from "../components/shared/card/Card";
import cards from "../components/shared/card/cards.json";
import { map } from "lodash";
import styles from "./styles.scss";
import { Pagination } from "../components/shared/layout";
import { PageSection } from "../components/shared/layout";
import { useMakeTranslation } from "../utils/translation/translate";
import config from "./config.json";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  getAllPets,
  getCats,
  getDogs,
  selectAllPets,
  selectCats,
  selectDogs,
} from "@/lib/redux/features/pet/petSlice";

export default function Home() {
  const t = useMakeTranslation(config.prefix);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const dogs = useAppSelector(selectDogs);
  const cats = useAppSelector(selectCats);
  const allPets = useAppSelector(selectAllPets);

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getCats());
    dispatch(getAllPets());
  }, [dispatch]);

  useEffect(() => {
    console.log(dogs, cats, allPets);
  }, [dogs, cats, allPets]);

  return (
    <>
      <div className="flex flex-col w-full">
        <PageSection primary={true} title={t("title")}>
          <div
            className="grey-bg min-h-12 mt-8 mb-8 p-4 flex flex-center flex-wrap rounded-2xl relative w-full cursor-pointer"
            onClick={() => router.push("/search")}
          >
            <h5 className="text-center inline-block lg:hidden">
              {t("searchByFilters")}
            </h5>

            <h5 className="text-center flex-1 hidden lg:inline-block">
              {t("searchBySpecies")}
            </h5>
            <div className="primary-bg-light h-full w-1 search-break absolute left-1/3 translate-x-1 hidden lg:inline-block"></div>
            <h5 className="text-center flex-1 hidden lg:inline-block">
              {t("searchByBreed")}
            </h5>
            <div className="primary-bg-light h-full w-1 search-break absolute left-2/3 -translate-x-1 hidden lg:inline-block"></div>
            <h5 className="text-center flex-1 hidden lg:inline-block">
              {t("searchByCity")}
            </h5>
          </div>
          <div className="card-container w-full">
            {/* {map(allPets, (pet, index) => (
              <Card
                key={index}
                cardInfo={pet}
                index={index >= 10 ? index - 10 : index}
              />
            ))} */}
            {map(cards.cards, (card, index) => (
              <Card
                key={index}
                cardInfo={card}
                index={index >= 10 ? index - 10 : index}
              />
            ))}
          </div>
          <div className="grey-bg min-h-12 mt-8 mb-8 p-4 flex flex-center flex-wrap rounded-2xl">
            <div className="pagination">
              <button
                className="hidden xl:inline-block"
                onClick={() => router.push("/search")}
              >
                <h5>{t("layout.seeMore", true)}</h5>
              </button>
            </div>
          </div>
        </PageSection>
        <PageSection
          primary={false}
          title={`${t("spieces.dogs", true)} ${t("layout.forAdoption", true)}`}
        >
          <div className="card-container w-full">
            {map(cards.cards, (card, index) =>
              index < 4 ? (
                <Card
                  key={index}
                  cardInfo={card}
                  index={index >= 10 ? index - 10 : index}
                />
              ) : (
                ""
              )
            )}
          </div>
        </PageSection>
        <PageSection
          primary={true}
          title={`${t("spieces.cats", true)} ${t("layout.forAdoption", true)}`}
        >
          <div className="card-container w-full">
            {map(cards.cards, (card, index) =>
              index < 4 ? (
                <Card
                  key={index}
                  cardInfo={card}
                  index={index >= 10 ? index - 10 : index}
                />
              ) : (
                ""
              )
            )}
          </div>
        </PageSection>
        <PageSection
          primary={false}
          title={`${t("spieces.horses", true)} ${t(
            "layout.forAdoption",
            true
          )}`}
        >
          <div className="card-container w-full">
            {map(cards.cards, (card, index) =>
              index < 4 ? (
                <Card
                  key={index}
                  cardInfo={card}
                  index={index >= 10 ? index - 10 : index}
                />
              ) : (
                ""
              )
            )}
          </div>
        </PageSection>
      </div>
    </>
  );
}
