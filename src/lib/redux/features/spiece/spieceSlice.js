import { createAsyncSlice } from "@/redux/createAsyncSlice";
import { getSpiecesAction } from "./spieceAction";

const initialState = {
  loading: false,
  spieces: [],
  error: false,
};

export const spieceSlice = createAsyncSlice({
  name: "spiece",
  initialState,
  reducers: (create) => ({
    getSpieces: create.asyncThunk(getSpiecesAction, {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.spieces = action.payload.spieces;
      },
      rejected: (state) => {
        state.error = true;
      },
    }),
  }),
  selectors: {
    selectSpieces: (state) => state.spieces,
  },
});

export const { getSpieces } = spieceSlice.actions;
export const { selectSpieces } = spieceSlice.selectors;
export default spieceSlice.reducer;
