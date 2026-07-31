import type { AlertNotification } from "../../types";

interface AlertsListProps {
  alerts: AlertNotification[];
  onMarkAsRead: (id: string) => void;
}

const AlertsList = ({ alerts, onMarkAsRead }: AlertsListProps) => {
  const getAlertIcon = (type: AlertNotification['type']) => {
    switch (type) {
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
    return date.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">التنبيهات</h2>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-start p-4 rounded-lg ${
              alert.isRead ? 'bg-gray-50' : 'bg-[#52B4D9]/5'
            }`}
          >
            <div className="flex-shrink-0">
              {getAlertIcon(alert.type)}
            </div>
            <div className="mr-3 flex-1">
              <p className={`text-sm ${alert.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
                {alert.message}
              </p>
              <span className="text-xs text-gray-500">
                {formatDate(alert.date)}
              </span>
            </div>
            {!alert.isRead && (
              <button
                onClick={() => onMarkAsRead(alert.id)}
                className="text-xs text-[#52B4D9] hover:underline"
              >
                تحديد كمقروء
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsList; 