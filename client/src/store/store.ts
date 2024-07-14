import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./auth-api-slice";
import { githubApiSlice } from "./github-api-slice";

export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [githubApiSlice.reducerPath]: githubApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
