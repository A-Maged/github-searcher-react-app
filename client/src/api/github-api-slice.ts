import { createApi } from "@reduxjs/toolkit/query/react";
import { GitHubUser } from "../types/github-user";
import { GithubRepository } from "../types/github-repository";
import { axiosBaseQuery } from "./axios-base-query";
import { unionBy } from "lodash";
import { SearchFormSelectVal } from "../pages/home/search-form/search-form-slice";
import { RESULTS_PER_PAGE } from "../contants";

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
        url: `search/repositories?per_page=${RESULTS_PER_PAGE}&q=${repoName}&page=${page}`,
      }),
      transformResponse: (response: any) => ({
        items: response.items,
        total_count: response.total_count,
      }),
      /* create a cache entry for each unique query */
      serializeQueryArgs: ({ queryArgs }) => {
        return SearchFormSelectVal.Repos + queryArgs.repoName;
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
        url: `search/users?per_page=${RESULTS_PER_PAGE}&q=${userName}&page=${page}`,
      }),
      /* create a cache entry for each unique query */
      serializeQueryArgs: ({ queryArgs }) => {
        return SearchFormSelectVal.Users + queryArgs.userName;
      },
      merge: (currentCache, newItems) => {
        currentCache.items = unionBy(currentCache.items, newItems.items, "id");
      },
      /* Refetch when the page arg changes */
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
  }),
});
