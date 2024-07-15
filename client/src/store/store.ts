import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "../api/auth-api-slice";
import { githubApiSlice } from "../api/github-api-slice";
import { searchFormSlice } from "../pages/home/search-form-slice";

export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [githubApiSlice.reducerPath]: githubApiSlice.reducer,
    [searchFormSlice.reducerPath]: searchFormSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(githubApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
