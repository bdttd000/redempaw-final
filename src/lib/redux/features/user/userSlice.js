import { createAsyncSlice } from "@/redux/createAsyncSlice";
import { createUserAction, getUsersAction } from "./userAction";

const initialState = {
  loading: false,
  users: [],
  user: null,
  error: false,
};

export const userSlice = createAsyncSlice({
  name: "user",
  initialState,
  reducers: (create) => ({
    createUser: create.asyncThunk((args) => createUserAction(args), {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.user = action.payload;
      },
      rejected: (state) => {
        state.error = true;
      },
    }),
    getUsers: create.asyncThunk(getUsersAction, {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.users = action.payload;
      },
      rejected: (state) => {
        state.error = true;
      },
    }),
  }),
  selectors: {
    selectUser: (state) => state.user,
    selectUsers: (state) => state.users,
    selectUserState: (state) => state,
  },
});

export const { createUser, getUsers } = userSlice.actions;
export const { selectUser, selectUsers, selectUserState } = userSlice.selectors;
export default userSlice.reducer;
