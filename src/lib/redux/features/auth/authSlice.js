import { createSlice } from "@reduxjs/toolkit";
import { getSessionAction } from "./authAction";

const initialState = {
  loading: false,
  session: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSessionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSessionAction.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload;
      })
      .addCase(getSessionAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectSession = (state) => state.auth;
export default authSlice.reducer;
