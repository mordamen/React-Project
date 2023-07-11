import { configureStore } from "@reduxjs/toolkit";
import darkThemeReducer from "./darkTheme";
import authReducer from "./auth";
import validateReducer from './userValidation'

const store = configureStore({
  reducer: {
    darkThemeSlice: darkThemeReducer,
    authSlice: authReducer,
    validateSlice: validateReducer,
  },
});

export default store;
