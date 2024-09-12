import { useTranslation } from "react-i18next";
import i18n from "../i18n";

export function useMakeTranslation(prefix) {
  const { t } = useTranslation("translation", { keyPrefix: prefix });
  const { t: tGlobal } = useTranslation("translation", {
    keyPrefix: "globals",
  });

  return function translate(string, isGlobal = false) {
    return isGlobal ? tGlobal(string) : t(string);
  };
}
