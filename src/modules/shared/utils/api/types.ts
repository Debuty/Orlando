export type ApiErrorBody = {
  message: string;
  errors?: unknown;
};

/** Normalized error used across the frontend */
export type AppApiError = {
  status: number | null;
  message: string;
  errors?: unknown;
  isNetworkError: boolean;
  raw?: unknown;
};

declare module 'axios' {
  export interface AxiosRequestConfig {
    /** Skip global 401 redirect (e.g. login/signup failures) */
    skipAuthRedirect?: boolean;
  }

  export interface InternalAxiosRequestConfig {
    skipAuthRedirect?: boolean;
    _retry?: boolean;
  }
}
