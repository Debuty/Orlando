import { useTranslation } from 'react-i18next';
import type { AlertNotification } from '../../types';

interface AlertsListProps {
  alerts: AlertNotification[];
  onMarkAsRead: (id: string) => void;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  isMarking?: boolean;
}

const AlertsList = ({
  alerts,
  onMarkAsRead,
  isLoading,
  isError,
  errorMessage,
  isMarking,
}: AlertsListProps) => {
  const { t } = useTranslation('dashboard');

  const getAlertIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'info':
        return '🔵';
      case 'warning':
        return '⚠️';
      case 'error':
        return '🔴';
      default:
        return 'ℹ️';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">{t('alerts.title')}</h2>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-gray-100" />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-sm text-red-600">
          {errorMessage || t('alerts.error')}
        </p>
      )}

      {!isLoading && !isError && alerts.length === 0 && (
        <p className="text-sm text-gray-500 py-6 text-center">{t('alerts.empty')}</p>
      )}

      {!isLoading && !isError && alerts.length > 0 && (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`flex items-start p-4 rounded-lg ${
                alert.isRead ? 'bg-gray-50' : 'bg-[#52B4D9]/5'
              }`}
            >
              <div className="flex-shrink-0">{getAlertIcon(alert.type)}</div>
              <div className="mr-3 flex-1">
                <p
                  className={`text-sm ${alert.isRead ? 'text-gray-600' : 'text-gray-900'}`}
                >
                  {alert.message}
                </p>
                <span className="text-xs text-gray-500">
                  {formatDate(alert.date)}
                </span>
              </div>
              {!alert.isRead && (
                <button
                  type="button"
                  disabled={isMarking}
                  onClick={() => onMarkAsRead(alert.id)}
                  className="text-xs text-[#52B4D9] hover:underline disabled:opacity-50"
                >
                  {t('alerts.markRead')}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsList;
