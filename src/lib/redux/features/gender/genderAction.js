import { API_PATH } from "@/app/constants/constants";

export const getGendersAction = async () => {
  try {
    const response = await fetch(`${API_PATH}/api/gender/getGenders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get genders");
    }

    return await response.json();
  } catch (error) {
    return error;
  }
};
