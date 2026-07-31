import axios, { type AxiosError } from 'axios';
import type { ApiErrorBody, AppApiError } from './types';

/**
 * Convert any Axios/unknown failure into one stable shape for the UI/RTK Query.
 */
export function normalizeApiError(error: unknown): AppApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorBody>;
    const status = axiosError.response?.status ?? null;
    const body = axiosError.response?.data;

    if (!axiosError.response) {
      return {
        status: null,
        message: 'تعذر الاتصال بالخادم. تحقق من الإنترنت أو أن السيرفر يعمل.',
        isNetworkError: true,
        raw: error,
      };
    }

    const message =
      (typeof body === 'object' && body && 'message' in body && typeof body.message === 'string'
        ? body.message
        : null) ||
      axiosError.message ||
      'حدث خطأ غير متوقع';

    return {
      status,
      message,
      errors: typeof body === 'object' && body && 'errors' in body ? body.errors : undefined,
      isNetworkError: false,
      raw: error,
    };
  }

  if (error instanceof Error) {
    return {
      status: null,
      message: error.message,
      isNetworkError: false,
      raw: error,
    };
  }

  return {
    status: null,
    message: 'حدث خطأ غير متوقع',
    isNetworkError: false,
    raw: error,
  };
}
