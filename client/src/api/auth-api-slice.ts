import { createApi } from "@reduxjs/toolkit/query/react";
import { httpClient } from "./http-client";
import axios from "axios";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../constants";
import { GitHubUser } from "../types/github-user";
import { axiosBaseQuery } from "./axios-base-query";

export interface AccessTokenResponse {
  access_token: string;
}

export const authApiSlice = createApi({
  reducerPath: "auth-api",

  baseQuery: axiosBaseQuery({
    baseUrl: "",
  }),

  endpoints: (builder) => ({
    getUser: builder.query<GitHubUser, void>({
      queryFn: async () => {
        const accessToken = localStorage.getItem(
          ACCESS_TOKEN_LOCAL_STORAGE_KEY
        );

        if (!accessToken) {
          throw new Error("No access token found in local storage");
        }

        const response = await httpClient("https://api.github.com/user");

        if (!response.data) {
          throw new Error("No user data found in response");
        }

        return response;
      },
    }),

    getAccessTokenWithCode: builder.query<AccessTokenResponse, string>({
      queryFn: async (code, api) => {
        const response = await axios<AccessTokenResponse>(
          `${import.meta.env.VITE_BACKEND_URL}/github-token?code=${code}`
        );

        if (!response.data.access_token) {
          throw new Error("No access token found in response");
        }

        localStorage.setItem(
          ACCESS_TOKEN_LOCAL_STORAGE_KEY,
          response.data.access_token
        );

        /* run getUser */
        await api.dispatch(
          authApiSlice.endpoints.getUser.initiate(undefined, {
            forceRefetch: true,
          })
        );

        return response;
      },
    }),
  }),
});
