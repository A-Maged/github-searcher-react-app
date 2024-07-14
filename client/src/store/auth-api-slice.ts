import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery, httpClient } from "./axios-base-query";
import axios, { AxiosError } from "axios";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../contants";

export interface AppUser {
  avatar_url: string;
  bio: string;
  blog: string;
  company: string;
  created_at: string;
  email: null;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  hireable: null;
  html_url: string;
  id: number;
  location: string;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: false;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: string;
  type: string;
  updated_at: string;
  url: string;
}

export interface AccessTokenResponse {
  access_token: string;
}

export const authApiSlice = createApi({
  reducerPath: "api",

  baseQuery: axiosBaseQuery({
    baseUrl: "",
  }),

  endpoints: (builder) => ({
    getUser: builder.query<AppUser, void>({
      queryFn: async () => {
        const accessToken = localStorage.getItem(
          ACCESS_TOKEN_LOCAL_STORAGE_KEY
        );

        if (!accessToken) {
          throw new Error("No access token found in local storage");
        }

        try {
          const response = await httpClient("https://api.github.com/user");

          if (!response.data) {
            throw new Error("No user data found in response");
          }

          return response;
        } catch (error: any) {
          localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);

          return {
            error: { status: 401, data: (error as AxiosError).message },
          };
        }
      },
    }),

    getAccessTokenWithCode: builder.query<AccessTokenResponse, string>({
      queryFn: async (code, api) => {
        try {
          const response = await axios<AccessTokenResponse>(
            `http://localhost:4000/github-token?code=${code}`
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
        } catch (error) {
          return {
            error: {
              status: "FETCH_ERROR",
              data: (error as AxiosError).message,
            },
          };
        }
      },
    }),
  }),
});
