import { createApi } from "@reduxjs/toolkit/query/react";
import { GitHubUser } from "../types/github-user";
import { GithubRepository } from "../types/github-repository";
import { axiosBaseQuery } from "./axios-base-query";
import { unionBy } from "lodash";

export type SearchReposResponse = {
  items: GithubRepository[];
  hasMore: boolean;
};

export type SearchUsersResponse = {
  items: GitHubUser[];
  hasMore: boolean;
};

export const githubApiSlice = createApi({
  reducerPath: "github-api",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://api.github.com/",
  }),
  endpoints: (builder) => ({
    searchRepos: builder.query<
      SearchReposResponse,
      { repoName: string; page?: number }
    >({
      query: ({ repoName, page = 1 }) => ({
        url: `search/repositories?q=${repoName}&page=${page}`,
      }),
      transformResponse: (response: any) => ({
        items: response.items,
        hasMore:
          response.total_count > response.items.length &&
          response.items.length > 0,
      }),
      // create a cache entry for each unique query
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return endpointName + queryArgs.repoName;
      },
      merge: (currentCache, newItems) => {
        currentCache.items = [...currentCache.items, ...newItems.items];
        currentCache.hasMore = newItems.hasMore;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),

    searchUsers: builder.query<
      SearchUsersResponse,
      { userName: string; page?: number }
    >({
      query: ({ userName, page = 1 }) => ({
        url: `search/users?q=${userName}&page=${page}`,
      }),
      transformResponse: (response: any) => ({
        items: response.items,
        hasMore:
          response.total_count > response.items.length &&
          response.items.length > 0,
      }),
      // create a cache entry for each unique query
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return endpointName + queryArgs.userName;
      },
      merge: (currentCache, newItems) => {
        currentCache.items = unionBy(currentCache.items, newItems.items, "id");

        currentCache.hasMore = newItems.hasMore;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
  }),
});
