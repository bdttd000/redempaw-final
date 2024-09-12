import { API_PATH } from "@/app/constants/constants";

export const getSpiecesAction = async () => {
  try {
    const response = await fetch(`${API_PATH}/api/spiece/getSpieces`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get spieces");
    }

    return await response.json();
  } catch (error) {
    return error;
  }
};
