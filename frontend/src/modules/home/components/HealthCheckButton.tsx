import React, { useState } from 'react';

type HealthStatus = 'idle' | 'loading' | 'ok' | 'error';

function getHealthUrl(): string {
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
  // /health is on the server root, not under /api
  return apiBase.replace(/\/api\/?$/, '') + '/health';
}

const HealthCheckButton: React.FC = () => {
  const [status, setStatus] = useState<HealthStatus>('idle');
  const [message, setMessage] = useState('');

  const handleClick = async () => {
    const url = getHealthUrl();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch(url);
      const data = (await res.json().catch(() => null)) as { status?: string } | null;

      if (!res.ok) {
        setStatus('error');
        setMessage(`HTTP ${res.status} — ${url}`);
        return;
      }

      setStatus('ok');
      setMessage(`${data?.status ?? 'ok'} — ${url}`);
    } catch {
      setStatus('error');
      setMessage(`تعذر الاتصال — ${url}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={status === 'loading'}
        className="bg-slate-800 hover:bg-slate-700 disabled:opacity-60 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        {status === 'loading' ? 'جاري فحص السيرفر...' : 'اختبار السيرفر (Health)'}
      </button>

      {message && (
        <p
          className={`text-sm ${
            status === 'ok' ? 'text-green-600' : status === 'error' ? 'text-red-600' : 'text-gray-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default HealthCheckButton;
