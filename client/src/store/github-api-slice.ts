import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery, httpClient } from "./axios-base-query";
import { AxiosError } from "axios";

export const githubApiSlice = createApi({
  reducerPath: "github-api",

  baseQuery: axiosBaseQuery({
    baseUrl: "",
  }),

  endpoints: (builder) => ({
    searchRepos: builder.query<any, string>({
      queryFn: async (repoName) => {
        try {
          const response = await httpClient(
            `https://api.github.com/search/repositories?q=${repoName}`
          );

          return response;
        } catch (error: any) {
          return {
            error: { status: 401, data: (error as AxiosError).message },
          };
        }
      },
    }),
  }),
});
