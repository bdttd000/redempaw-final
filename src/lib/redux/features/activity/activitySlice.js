import { createAsyncSlice } from "@/redux/createAsyncSlice";
import { getActivitiesAction } from "./activityAction";

const initialState = {
  loading: false,
  activities: [],
  error: false,
};

export const activitySlice = createAsyncSlice({
  name: "activity",
  initialState,
  reducers: (create) => ({
    getActivities: create.asyncThunk(getActivitiesAction, {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.activities = action.payload.activities;
      },
      rejected: (state) => {
        state.error = true;
      },
    }),
  }),
  selectors: {
    selectActivities: (state) => state.activities,
  },
});

export const { getActivities } = activitySlice.actions;
export const { selectActivities } = activitySlice.selectors;
export default activitySlice.reducer;
