import styles from "./styles.scss";
import location from "@/public/assets/location.svg";
import Image from "next/image";
import config from "./config.json";
import { useMakeTranslation } from "@/app/utils/translation/translate";
import { useRouter } from "next/navigation";

export default function Card({ cardInfo, index }) {
  const t = useMakeTranslation(config.prefix);
  const router = useRouter();

  return (
    <div
      className="card w-full h-96 cursor-pointer"
      onClick={() => router.push(`/pet-info/${cardInfo.id}`)}
    >
      <div className="absolute h-full w-full bg-slate-400">
        <img
          src={cardInfo.avatarUrl ?? `/images/${index + 1}.jpg`}
          alt={`Image ${index + 1}`}
          className="h-full w-full object-cover shadow-lg"
        />
      </div>
      <div className="absolute z-20 top-2 left-2 pl-1 pr-1 rounded-large grey-bg ">
        <div className="text-primary m-1 flex">
          <Image
            priority
            src={location}
            className="w-auto h-3/4 cursor-pointer"
            alt="Gear"
          />
          <h6 className="ml-1 mr-2">{cardInfo.city}</h6>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-10 flex flex-center">
        <div className="absolute grey-bg w-full h-full z-1"></div>
        <span className="relative z-10">
          <h5>{cardInfo.name}</h5>
        </span>
      </div>
      <div className="card-hover">
        <div className="absolute bg-black opacity-60 w-full h-full"></div>
        <div className="absolute bg-primary rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-center flex-col p-3">
          <span className="whitespace-nowrap">
            <h5>
              {t("name")}: {cardInfo.name}
            </h5>
          </span>
          <span className="whitespace-nowrap">
            <h5>
              {t("gender")}: {t(`petInfo.${cardInfo.gender}`, true)}
            </h5>
          </span>
          <span className="whitespace-nowrap">
            <h5>
              {t("age")}: {t(`petInfo.${cardInfo.age}`, true)}
            </h5>
          </span>
        </div>
      </div>
    </div>
  );
}
