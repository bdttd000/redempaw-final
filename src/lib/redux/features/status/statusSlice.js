import { createAsyncSlice } from "@/redux/createAsyncSlice";
import { getStatusesAction } from "./statusAction";

const initialState = {
  loading: false,
  statuses: [],
  error: false,
};

export const statusSlice = createAsyncSlice({
  name: "status",
  initialState,
  reducers: (create) => ({
    getStatuses: create.asyncThunk(getStatusesAction, {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.statuses = action.payload.statuses;
      },
      rejected: (state) => {
        state.error = true;
      },
    }),
  }),
  selectors: {
    selectStatuses: (state) => state.statuses,
  },
});

export const { getStatuses } = statusSlice.actions;
export const { selectStatuses } = statusSlice.selectors;
export default statusSlice.reducer;
