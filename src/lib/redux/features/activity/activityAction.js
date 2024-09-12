import { API_PATH } from "@/app/constants/constants";

export const getActivitiesAction = async () => {
  try {
    const response = await fetch(`${API_PATH}/api/activity/getActivities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get activities");
    }

    return await response.json();
  } catch (error) {
    return error;
  }
};
