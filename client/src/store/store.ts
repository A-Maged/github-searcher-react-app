import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authApiSlice } from "../api/auth-api-slice";
import { githubApiSlice } from "../api/github-api-slice";
import { searchFormSlice } from "../pages/home/search-form/search-form-slice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [searchFormSlice.reducerPath],
};

const rootReducer = combineReducers({
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [githubApiSlice.reducerPath]: githubApiSlice.reducer,
  [searchFormSlice.reducerPath]: searchFormSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApiSlice.middleware)
      .concat(githubApiSlice.middleware),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
