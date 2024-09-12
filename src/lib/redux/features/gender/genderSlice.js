import { createAsyncSlice } from "@/redux/createAsyncSlice";
import { getGendersAction } from "./genderAction";

const initialState = {
  loading: false,
  genders: [],
  error: false,
};

export const genderSlice = createAsyncSlice({
  name: "gender",
  initialState,
  reducers: (create) => ({
    getGenders: create.asyncThunk(getGendersAction, {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.genders = action.payload.genders;
      },
      rejected: (state) => {
        state.error = true;
      },
    }),
  }),
  selectors: {
    selectGenders: (state) => state.genders,
  },
});

export const { getGenders } = genderSlice.actions;
export const { selectGenders } = genderSlice.selectors;
export default genderSlice.reducer;
