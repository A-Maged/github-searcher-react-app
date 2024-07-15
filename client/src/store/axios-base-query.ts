import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../contants";

export const httpClient = axios.create();

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);

  if (accessToken) {
    config.headers["Authorization"] = `token ${accessToken}`;
  }

  return config;
});

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    { status: number | undefined; data: {} }
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await httpClient({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data:
            (err.response as any)?.message ||
            (err.response as any)?.data?.message ||
            err.message ||
            err.response?.data,
        },
      };
    }
  };
