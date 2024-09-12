import { createAsyncThunk } from "@reduxjs/toolkit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

export const getSessionAction = createAsyncThunk(
  "auth/getSession",
  async (_, thunkAPI) => {
    try {
      const res = await getServerSession(authOptions);
      console.log(res);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
