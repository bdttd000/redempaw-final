import { createAsyncSlice } from "@/redux/createAsyncSlice";
import {
  getPetsAction,
  createPetAction,
  getDogsAction,
  getCatsAction,
  getAllPetsAction,
} from "./petAction";

const initialState = {
  loading: false,
  pets: [],
  totalPages: 0,
  currentPage: 1,
  dogs: [],
  cats: [],
  allPets: [],
  error: null,
};

export const petSlice = createAsyncSlice({
  name: "pet",
  initialState,
  reducers: (create) => ({
    createPet: create.asyncThunk((args) => createPetAction(args), {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.pet = action.payload;
      },
      rejected: (state) => {
        state.error = true;
      },
    }),
    getPets: create.asyncThunk(
      ({ filters, page, limit }) => getPetsAction(filters, page, limit),
      {
        pending: (state) => {
          state.loading = true;
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.pets = action.payload.pets;
          state.totalPages = action.payload.totalPages;
          state.currentPage = action.payload.currentPage;
        },
        rejected: (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        },
      }
    ),
    getDogs: create.asyncThunk(getDogsAction, {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.dogs = action.payload.pets;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    }),
    getCats: create.asyncThunk(getCatsAction, {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.cats = action.payload.pets;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    }),
    getAllPets: create.asyncThunk(getAllPetsAction, {
      pending: (state) => {
        state.loading = true;
        state.error = null;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.allPets = action.payload.pets;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    }),
  }),
  selectors: {
    selectDogs: (state) => state.dogs,
    selectCats: (state) => state.cats,
    selectAllPets: (state) => state.allPets,
    selectPetState: (state) => state.pets,
  },
});

export const { getPets, createPet, getDogs, getCats, getAllPets } =
  petSlice.actions;
export const { selectDogs, selectCats, selectAllPets, selectPetState } =
  petSlice.selectors;
export default petSlice.reducer;
