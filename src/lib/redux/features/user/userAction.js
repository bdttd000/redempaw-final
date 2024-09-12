import { signIn } from "next-auth/react";
import { API_PATH } from "@/app/constants/constants";

export const createUserAction = async ({ registerData, setError }) => {
  try {
    const res = await fetch(`${API_PATH}/api/user/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });
    if (!res.ok) {
      setError((await res.json()).error);
      return;
    }

    signIn(undefined, { callbackUrl: "/" });
  } catch (error) {
    setError(error?.message);
  }
};

export const getUsersAction = async () => {
  try {
    const response = await fetch(`${API_PATH}/api/user/getUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get users");
    }
    return await response.json();
  } catch (error) {
    return error;
  }
};
