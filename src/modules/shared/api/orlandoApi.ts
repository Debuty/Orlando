import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../utils/api/axiosBaseQuery';
import { setCredentials, setUser } from '../../auth/store/authSlice';
import type {
  AlertItem,
  AuthResponse,
  AuthUser,
  Booking,
  BookingConfirmationResponse,
  BookingsListParams,
  Chalet,
  ChaletDetails,
  ChaletPayload,
  ChaletsListParams,
  ContactPayload,
  CreateBookingPayload,
  CreateBookingResponse,
  DashboardCharts,
  DashboardStats,
  Paginated,
  QrValidateResponse,
  RecentBooking,
} from './types';

export const orlandoApi = createApi({
  reducerPath: 'orlandoApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    'Auth',
    'Chalet',
    'Booking',
    'Dashboard',
    'Alert',
    'Contact',
  ],
  endpoints: (builder) => ({
    // ─── Auth ───────────────────────────────────────────
    signup: builder.mutation<
      AuthResponse,
      {
        name: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;
      }
    >({
      query: (body) => ({
        url: '/auth/signup',
        method: 'post',
        data: body,
        skipAuthRedirect: true,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
          /* mutation error surfaced via hook */
        }
      },
      invalidatesTags: ['Auth'],
    }),

    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (body) => ({
        url: '/auth/login',
        method: 'post',
        data: body,
        skipAuthRedirect: true,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
          /* mutation error surfaced via hook */
        }
      },
      invalidatesTags: ['Auth'],
    }),

    me: builder.query<{ user: AuthUser }, void>({
      query: () => ({ url: '/auth/me', method: 'get' }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
        } catch {
          /* ignore */
        }
      },
      providesTags: ['Auth'],
    }),

    // ─── Chalets ────────────────────────────────────────
    getChalets: builder.query<Paginated<Chalet>, ChaletsListParams | void>({
      query: (params) => ({
        url: '/chalets',
        method: 'get',
        params: (params ?? {}) as Record<string, unknown>,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: 'Chalet' as const, id })),
              { type: 'Chalet', id: 'LIST' },
            ]
          : [{ type: 'Chalet', id: 'LIST' }],
    }),

    getFeaturedChalets: builder.query<{ items: Chalet[] }, { limit?: number } | void>({
      query: (params) => ({
        url: '/chalets/featured',
        method: 'get',
        params: (params ?? {}) as Record<string, unknown>,
      }),
      providesTags: [{ type: 'Chalet', id: 'FEATURED' }],
    }),

    getChaletById: builder.query<ChaletDetails, string>({
      query: (id) => ({
        url: `/chalets/${id}`,
        method: 'get',
      }),
      providesTags: (_r, _e, id) => [{ type: 'Chalet', id }],
    }),

    createChalet: builder.mutation<Chalet, ChaletPayload>({
      query: (body) => ({
        url: '/chalets',
        method: 'post',
        data: body,
      }),
      invalidatesTags: [
        { type: 'Chalet', id: 'LIST' },
        { type: 'Chalet', id: 'FEATURED' },
        'Dashboard',
      ],
    }),

    updateChalet: builder.mutation<Chalet, { id: string; data: Partial<ChaletPayload> }>({
      query: ({ id, data }) => ({
        url: `/chalets/${id}`,
        method: 'put',
        data,
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Chalet', id },
        { type: 'Chalet', id: 'LIST' },
        { type: 'Chalet', id: 'FEATURED' },
        'Dashboard',
      ],
    }),

    deleteChalet: builder.mutation<Chalet, string>({
      query: (id) => ({
        url: `/chalets/${id}`,
        method: 'delete',
      }),
      invalidatesTags: [
        { type: 'Chalet', id: 'LIST' },
        { type: 'Chalet', id: 'FEATURED' },
        'Dashboard',
      ],
    }),

    // ─── Bookings ───────────────────────────────────────
    createBooking: builder.mutation<CreateBookingResponse, CreateBookingPayload>({
      query: (body) => ({
        url: '/bookings',
        method: 'post',
        data: body,
      }),
      invalidatesTags: ['Booking', 'Dashboard', 'Alert', 'Chalet'],
    }),

    getBookingById: builder.query<BookingConfirmationResponse, string>({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: 'get',
      }),
      providesTags: (_r, _e, id) => [{ type: 'Booking', id }],
    }),

    getBookings: builder.query<Paginated<Booking>, BookingsListParams | void>({
      query: (params) => ({
        url: '/bookings',
        method: 'get',
        params: (params ?? {}) as Record<string, unknown>,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: 'Booking' as const, id })),
              { type: 'Booking', id: 'LIST' },
            ]
          : [{ type: 'Booking', id: 'LIST' }],
    }),

    updateBookingStatus: builder.mutation<
      { booking: Booking },
      { id: string; status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' }
    >({
      query: ({ id, status }) => ({
        url: `/bookings/${id}/status`,
        method: 'patch',
        data: { status },
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Booking', id },
        { type: 'Booking', id: 'LIST' },
        'Dashboard',
        'Alert',
      ],
    }),

    validateQr: builder.mutation<QrValidateResponse, { token: string }>({
      query: (body) => ({
        url: '/qr/validate',
        method: 'post',
        data: body,
      }),
      invalidatesTags: ['Booking'],
    }),

    // ─── Dashboard (Admin) ──────────────────────────────
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => ({ url: '/dashboard/stats', method: 'get' }),
      providesTags: ['Dashboard'],
    }),

    getDashboardCharts: builder.query<DashboardCharts, void>({
      query: () => ({ url: '/dashboard/charts', method: 'get' }),
      providesTags: ['Dashboard'],
    }),

    getRecentBookings: builder.query<{ items: RecentBooking[] }, { limit?: number } | void>({
      query: (params) => ({
        url: '/dashboard/recent-bookings',
        method: 'get',
        params: (params ?? {}) as Record<string, unknown>,
      }),
      providesTags: ['Dashboard', 'Booking'],
    }),

    getAlerts: builder.query<{ items: AlertItem[] }, void>({
      query: () => ({ url: '/alerts', method: 'get' }),
      providesTags: ['Alert'],
    }),

    markAlertRead: builder.mutation<AlertItem, string>({
      query: (id) => ({
        url: `/alerts/${id}/read`,
        method: 'patch',
      }),
      invalidatesTags: ['Alert'],
    }),

    // ─── Contact ────────────────────────────────────────
    sendContactMessage: builder.mutation<{ id: string; message: string }, ContactPayload>({
      query: (body) => ({
        url: '/contact',
        method: 'post',
        data: body,
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useMeQuery,
  useLazyMeQuery,
  useGetChaletsQuery,
  useGetFeaturedChaletsQuery,
  useGetChaletByIdQuery,
  useCreateChaletMutation,
  useUpdateChaletMutation,
  useDeleteChaletMutation,
  useCreateBookingMutation,
  useGetBookingByIdQuery,
  useGetBookingsQuery,
  useUpdateBookingStatusMutation,
  useValidateQrMutation,
  useGetDashboardStatsQuery,
  useGetDashboardChartsQuery,
  useGetRecentBookingsQuery,
  useGetAlertsQuery,
  useMarkAlertReadMutation,
  useSendContactMessageMutation,
} = orlandoApi;
