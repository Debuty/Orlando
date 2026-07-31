export const Roles = {
  ADMIN: 'ADMIN',
  TENANT: 'TENANT',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export const BookingStatuses = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
} as const;

export type BookingStatus = (typeof BookingStatuses)[keyof typeof BookingStatuses];

export const PaymentStatuses = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
} as const;

export type PaymentStatus = (typeof PaymentStatuses)[keyof typeof PaymentStatuses];

export const QrStatuses = {
  ACTIVE: 'ACTIVE',
  USED: 'USED',
  EXPIRED: 'EXPIRED',
  REVOKED: 'REVOKED',
} as const;

export type QrStatus = (typeof QrStatuses)[keyof typeof QrStatuses];

export const AlertTypes = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
} as const;

export type AlertType = (typeof AlertTypes)[keyof typeof AlertTypes];
