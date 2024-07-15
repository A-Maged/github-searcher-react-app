import { createApi } from "@reduxjs/toolkit/query/react";
import { GitHubUser } from "../types/github-user";
import { GithubRepository } from "../types/github-repository";
import { axiosBaseQuery } from "./axios-base-query";
import { unionBy } from "lodash";

export type SearchReposResponse = {
  items: GithubRepository[];
  total_count: number;
};

export type SearchUsersResponse = {
  items: GitHubUser[];
  total_count: number;
};

export const githubApiSlice = createApi({
  reducerPath: "github-api",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://api.github.com/",
  }),
  endpoints: (builder) => ({
    searchRepos: builder.query<
      SearchReposResponse,
      { repoName: string; page: number }
    >({
      query: ({ repoName, page }) => ({
        url: `search/repositories?q=${repoName}&page=${page}`,
      }),
      transformResponse: (response: any) => ({
        items: response.items,
        total_count: response.total_count,
      }),
      /* create a cache entry for each unique query */
      serializeQueryArgs: ({ queryArgs }) => {
        return "repos-" + queryArgs.repoName;
      },
      merge: (currentCache, newItems) => {
        currentCache.items = unionBy(currentCache.items, newItems.items, "id");
      },
      /* Refetch when the page arg changes */
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),

    searchUsers: builder.query<
      SearchUsersResponse,
      { userName: string; page: number }
    >({
      query: ({ userName, page }) => ({
        url: `search/users?q=${userName}&page=${page}`,
      }),
      /* create a cache entry for each unique query */
      serializeQueryArgs: ({ queryArgs }) => {
        return "users-" + queryArgs.userName;
      },
      merge: (currentCache, newItems) => {
        return {
          items: [...currentCache.items, ...newItems.items],
          total_count: newItems.total_count,
        };
      },
      /* Refetch when the page arg changes */
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
  }),
});
