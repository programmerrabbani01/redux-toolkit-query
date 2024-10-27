import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlice.js";
import teamReducer from "../features/team/teamSlice.js";

// create store

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    team: teamReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// export store
export default store;
