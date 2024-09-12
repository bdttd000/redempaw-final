import { API_PATH } from "@/app/constants/constants";

export const getCititesAction = async () => {
  try {
    const response = await fetch(`${API_PATH}/api/city/getCities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get cities");
    }

    return await response.json();
  } catch (error) {
    return error;
  }
};
