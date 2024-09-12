export const getLanguagesAction = async () => {
  const data = [
    {
      code: "pl-PL",
      isEnabled: true,
      isDefault: true,
    },
    {
      code: "en-US",
      isEnabled: true,
      isDefault: false,
    },
    {
      code: "de-DE",
      isEnabled: true,
      isDefault: false,
    },
  ];
  return data;
};
