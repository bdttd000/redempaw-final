const { createHash } = require("crypto");

export const getActiveLanguage = () => {
  return localStorage.getItem("i18nextLng") ?? "en-US";
};

export const hash = (string) => {
  return createHash("sha256").update(string).digest("hex");
};
