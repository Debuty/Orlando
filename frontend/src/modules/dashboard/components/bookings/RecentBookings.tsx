import { useTranslation } from 'react-i18next';
import type { RecentBooking } from '../../types';
import type { Pagination } from '../../../shared/api/types';

interface RecentBookingsProps {
  bookings: RecentBooking[];
  pagination?: Pagination;
  page: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const RecentBookings = ({
  bookings,
  pagination,
  page,
  onPageChange,
  isLoading,
  isError,
  errorMessage,
}: RecentBookingsProps) => {
  const { t } = useTranslation('dashboard');
  const totalPages = pagination?.totalPages ?? 1;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const key = status.toLowerCase();
    if (key === 'confirmed' || key === 'pending' || key === 'cancelled') {
      return t(`recentBookings.status.${key}`);
    }
    return status;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">{t('recentBookings.title')}</h2>

      {isLoading && (
        <div className="h-40 animate-pulse rounded-lg bg-gray-100" />
      )}

      {isError && (
        <p className="text-sm text-red-600">
          {errorMessage || t('recentBookings.error')}
        </p>
      )}

      {!isLoading && !isError && bookings.length === 0 && (
        <p className="text-sm text-gray-500 py-6 text-center">
          {t('recentBookings.empty')}
        </p>
      )}

      {!isLoading && !isError && bookings.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('recentBookings.columns.chalet')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('recentBookings.columns.customer')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('recentBookings.columns.checkIn')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('recentBookings.columns.checkOut')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('recentBookings.columns.amount')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('recentBookings.columns.status')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.chaletName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.checkIn).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.checkOut).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.amount.toLocaleString('ar-SA')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}
                      >
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <nav
              className="mt-4 flex items-center justify-between gap-3"
              aria-label={t('recentBookings.pagination.label')}
            >
              <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1 || isLoading}
                className="px-3 py-1.5 text-sm rounded-lg bg-[#00B5E2]/5 text-[#00B5E2] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#00B5E2]/10 transition-colors"
              >
                {t('recentBookings.pagination.prev')}
              </button>
              <span className="text-sm text-gray-600">
                {t('recentBookings.pagination.pageOf', {
                  page,
                  totalPages,
                })}
              </span>
              <button
                type="button"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages || isLoading}
                className="px-3 py-1.5 text-sm rounded-lg bg-[#00B5E2]/5 text-[#00B5E2] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#00B5E2]/10 transition-colors"
              >
                {t('recentBookings.pagination.next')}
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default RecentBookings;
