import { createAsyncSlice } from "@/redux/createAsyncSlice";
import { getAgesAction } from "./ageAction";

const initialState = {
  loading: false,
  ages: [],
  error: false,
};

export const ageSlice = createAsyncSlice({
  name: "age",
  initialState,
  reducers: (create) => ({
    getAges: create.asyncThunk(getAgesAction, {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.ages = action.payload.ages;
      },
      rejected: (state) => {
        state.error = true;
      },
    }),
  }),
  selectors: {
    selectAges: (state) => state.ages,
  },
});

export const { getAges } = ageSlice.actions;
export const { selectAges } = ageSlice.selectors;
export default ageSlice.reducer;
