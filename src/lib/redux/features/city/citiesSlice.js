import { createAsyncSlice } from "@/redux/createAsyncSlice";
import { getCititesAction } from "./citiesAction";

const initialState = {
  loading: false,
  cities: [],
  error: false,
};

export const citySlice = createAsyncSlice({
  name: "city",
  initialState,
  reducers: (create) => ({
    getCitites: create.asyncThunk(getCititesAction, {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.cities = action.payload.cities;
      },
      rejected: (state) => {
        state.error = true;
      },
    }),
  }),
  selectors: {
    selectCities: (state) => state.cities,
  },
});

export const { getCitites } = citySlice.actions;
export const { selectCities } = citySlice.selectors;
export default citySlice.reducer;
