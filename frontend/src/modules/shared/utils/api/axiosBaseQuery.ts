import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig } from 'axios';
import { api } from './axiosInstance';
import type { AppApiError } from './types';
import { normalizeApiError } from './errorHandler';

export type AxiosBaseQueryArgs = {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: unknown;
  params?: Record<string, unknown>;
  /** Skip global 401 → login redirect (login/signup wrong credentials) */
  skipAuthRedirect?: boolean;
};

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, AppApiError> =>
  async ({ url, method = 'GET', data, params, skipAuthRedirect }) => {
    try {
      const result = await api({
        url,
        method,
        data,
        params,
        skipAuthRedirect,
      });
      return { data: result.data };
    } catch (error) {
      // Axios interceptor already normalizes to AppApiError in most cases
      const normalized =
        error && typeof error === 'object' && 'message' in error && 'isNetworkError' in error
          ? (error as AppApiError)
          : normalizeApiError(error);
      return { error: normalized };
    }
  };
