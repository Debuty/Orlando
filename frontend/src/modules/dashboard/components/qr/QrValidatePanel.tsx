import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useValidateQrMutation } from '../../../shared/api/orlandoApi';
import type { QrValidateResponse } from '../../../shared/api/types';

/** Extract QR token from raw token or full dashboard URL with ?token= */
export function extractQrToken(raw: string): string {
  const value = raw.trim();
  if (!value) return '';
  try {
    if (value.includes('token=')) {
      const url = value.startsWith('http')
        ? new URL(value)
        : new URL(value, window.location.origin);
      const token = url.searchParams.get('token');
      if (token) return token.trim();
    }
  } catch {
    /* plain token */
  }
  return value;
}

type QrValidatePanelProps = {
  /** Prefill from URL; triggers auto-validate once when set */
  initialToken?: string | null;
  onAutoValidateDone?: () => void;
};

const QrValidatePanel = ({
  initialToken = null,
  onAutoValidateDone,
}: QrValidatePanelProps) => {
  const { t } = useTranslation('dashboard');
  const [tokenInput, setTokenInput] = useState(initialToken ?? '');
  const [result, setResult] = useState<QrValidateResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [validateQr, { isLoading }] = useValidateQrMutation();
  const autoRanFor = useRef<string | null>(null);

  const runValidate = async (raw: string) => {
    const token = extractQrToken(raw);
    if (!token) return;

    setApiError(null);
    setResult(null);

    try {
      const data = await validateQr({ token }).unwrap();
      setResult(data);
    } catch (err) {
      const message =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : t('qrValidate.error');
      setApiError(message || t('qrValidate.error'));
    }
  };

  useEffect(() => {
    if (!initialToken) return;
    const token = extractQrToken(initialToken);
    if (!token || autoRanFor.current === token) return;
    autoRanFor.current = token;
    setTokenInput(token);
    void runValidate(token).finally(() => {
      onAutoValidateDone?.();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once per token from URL
  }, [initialToken]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void runValidate(tokenInput);
  };

  const reasonKey = (reason: string) => {
    const key = `qrValidate.reasons.${reason}` as const;
    const translated = t(key);
    return translated === key ? t('qrValidate.reasons.UNKNOWN') : translated;
  };

  return (
    <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {t('qrValidate.title')}
        </h2>
        <p className="mt-1 text-sm text-gray-600">{t('qrValidate.subtitle')}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 mb-4"
      >
        <div className="flex-1">
          <label htmlFor="qr-token" className="sr-only">
            {t('qrValidate.tokenLabel')}
          </label>
          <input
            id="qr-token"
            type="text"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            disabled={isLoading}
            placeholder={t('qrValidate.tokenPlaceholder')}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2] disabled:opacity-60"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !tokenInput.trim()}
          className="shrink-0 rounded-lg bg-[#00B5E2] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#33C3E7] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? t('qrValidate.submitting') : t('qrValidate.submit')}
        </button>
      </form>

      {apiError && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {apiError}
        </div>
      )}

      {result?.valid === true && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 p-4"
        >
          <p className="font-semibold text-green-800 mb-3">
            {t('qrValidate.successTitle')}
          </p>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-green-900">
            <div>
              <dt className="text-green-700">{t('qrValidate.fields.customer')}</dt>
              <dd className="font-medium">{result.booking.customerName}</dd>
            </div>
            <div>
              <dt className="text-green-700">{t('qrValidate.fields.chalet')}</dt>
              <dd className="font-medium">{result.booking.chaletName}</dd>
            </div>
            <div>
              <dt className="text-green-700">{t('qrValidate.fields.bookingCode')}</dt>
              <dd className="font-medium">{result.booking.bookingCode}</dd>
            </div>
            <div>
              <dt className="text-green-700">{t('qrValidate.fields.guests')}</dt>
              <dd className="font-medium">{result.booking.guestCount}</dd>
            </div>
            <div>
              <dt className="text-green-700">{t('qrValidate.fields.checkIn')}</dt>
              <dd className="font-medium">
                {new Date(result.booking.checkIn).toLocaleDateString()}
              </dd>
            </div>
            <div>
              <dt className="text-green-700">{t('qrValidate.fields.checkOut')}</dt>
              <dd className="font-medium">
                {new Date(result.booking.checkOut).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>
      )}

      {result?.valid === false && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4"
        >
          <p className="font-semibold text-red-800 mb-1">
            {t('qrValidate.failTitle')}
          </p>
          <p className="text-sm text-red-700">{reasonKey(result.reason)}</p>
        </div>
      )}
    </section>
  );
};

export default QrValidatePanel;
