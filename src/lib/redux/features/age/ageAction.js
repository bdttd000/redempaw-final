import { API_PATH } from "@/app/constants/constants";

export const getAgesAction = async () => {
  try {
    const response = await fetch(`${API_PATH}/api/age/getAges`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get ages");
    }

    return await response.json();
  } catch (error) {
    return error;
  }
};
