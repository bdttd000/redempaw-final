import { createAsyncSlice } from "@/redux/createAsyncSlice";
import { getLanguagesAction } from "./languageAction";

const initialState = {
  loading: false,
  languages: [],
  error: false,
};

export const languageSlice = createAsyncSlice({
  name: "language",
  initialState,
  reducers: (create) => ({
    getLanguages: create.asyncThunk(getLanguagesAction, {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.languages = action.payload;
      },
      rejected: (state) => {
        state.error = true;
      },
    }),
  }),
  selectors: {
    selectLanguages: (state) => state,
  },
});

export const { getLanguages } = languageSlice.actions;
export const { selectLanguages } = languageSlice.selectors;
export default languageSlice.reducer;
