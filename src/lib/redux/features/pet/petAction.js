import { API_PATH } from "@/app/constants/constants";

export const createPetAction = async ({ formData, userId, setError }) => {
  console.log(formData, setError);
  try {
    const res = await fetch(`${API_PATH}/api/pet/createPet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, userId }),
    });
    if (!res.ok) {
      setError((await res.json()).error);
      return;
    }
  } catch (error) {
    setError(error?.message);
  }
};

export const getPetsAction = async (filters = {}, page = 1, limit = 10) => {
  try {
    const queryParams = new URLSearchParams({
      page: page,
      limit: limit,
      ...filters,
    });

    console.log(queryParams.toString());

    const response = await fetch(`${API_PATH}/api/pet/getPets?${queryParams}`);

    if (!response.ok) {
      throw new Error("Failed to fetch pets");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const getDogsAction = async () => {
  try {
    const response = await fetch(
      `${API_PATH}/api/pet/getPets?spiece=1&limit=4`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch dogs");
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};

export const getCatsAction = async () => {
  try {
    const response = await fetch(
      `${API_PATH}/api/pet/getPets?spiece=2&limit=4`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch cats");
    }
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};

export const getAllPetsAction = async () => {
  try {
    const response = await fetch(`${API_PATH}/api/pet/getPets?limit=12`);
    if (!response.ok) {
      throw new Error("Failed to fetch pets");
    }
    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
};
