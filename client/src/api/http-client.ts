import axios from "axios";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "../contants";

export const httpClient = axios.create();

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);

  if (accessToken) {
    config.headers["Authorization"] = `token ${accessToken}`;
  }

  return config;
});
