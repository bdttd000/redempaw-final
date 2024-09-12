import { combineReducers, configureStore } from "@reduxjs/toolkit";
import languageReducer from "@/redux/features/language/languageSlice";
import userReducer from "@/redux/features/user/userSlice";
import authReducer from "@/redux/features/auth/authSlice";
import cityReducer from "@/redux/features/city/citiesSlice";
import petReducer from "@/redux/features/pet/petSlice";
import activityReducer from "@/redux/features/activity/activitySlice";
import ageReducer from "@/redux/features/age/ageSlice";
import genderReducer from "@/redux/features/gender/genderSlice";
import spieceReducer from "@/redux/features/spiece/spieceSlice";
import statusReducer from "@/redux/features/status/statusSlice";

const rootReducer = combineReducers({
  language: languageReducer,
  user: userReducer,
  auth: authReducer,
  city: cityReducer,
  pet: petReducer,
  activity: activityReducer,
  age: ageReducer,
  gender: genderReducer,
  spiece: spieceReducer,
  status: statusReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  });
};
