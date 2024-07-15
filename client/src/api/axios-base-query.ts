import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { httpClient } from "./http-client";

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
    { status: number | undefined; message: string }
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
          message:
            (err.response as any)?.message ||
            (err.response as any)?.data?.message ||
            err.message ||
            err.response?.data ||
            "An error occurred",
        },
      };
    }
  };
