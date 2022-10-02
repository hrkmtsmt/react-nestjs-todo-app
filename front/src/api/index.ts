import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  responseType: 'json',
};

export const axiosInstance: AxiosInstance = axios.create(axiosRequestConfig);

export const api = {
  get: async <T>(path: string) => {
    try {
      const { data } = await axiosInstance.get<T>(path);
      if (!data) throw new Error('Error');
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) return error;
    }
  },
  post: async <T, U>(path: string, request: U) => {
    try {
      const { data } = await axiosInstance.post<T>(path, request);
      if (!data) throw new Error('Error');
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) return error;
    }
  },
  patch: async <T, U>(path: string, request: U) => {
    try {
      const { data } = await axiosInstance.patch<T>(path, request);
      if (!data) throw new Error('Error');
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) return error;
    }
  },
  delete: async <T>(path: string) => {
    try {
      const { data } = await axiosInstance.delete<T>(path);
      if (!data) throw new Error('Error');
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) return error;
    }
  },
};
