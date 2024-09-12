import { API_PATH } from "@/app/constants/constants";

export const getStatusesAction = async () => {
  try {
    const response = await fetch(`${API_PATH}/api/status/getStatuses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get statuses");
    }

    return await response.json();
  } catch (error) {
    return error;
  }
};
