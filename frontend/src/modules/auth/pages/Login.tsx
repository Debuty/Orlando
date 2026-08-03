import { useMemo, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { RootState } from '../../../store/index';
import { useLoginMutation } from '../../shared/api/orlandoApi';
import {
  createLoginSchema,
  type LoginFormValues,
} from '../schemas/loginSchema';

const inputClass =
  'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#52B4D9] focus:border-transparent disabled:opacity-60';

const Login = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const { t, i18n } = useTranslation('auth');
  const direction = useSelector((state: RootState) => state.locale.dir);
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();

  const schema = useMemo(() => createLoginSchema(t), [t, i18n.language]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setApiError(null);
    try {
      await login({
        email: data.email.trim(),
        password: data.password,
      }).unwrap();

      const from = (location.state as { from?: string } | null)?.from;
      navigate(from && from.startsWith('/') ? from : '/', { replace: true });
    } catch (err) {
      const message =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : t('messages.loginError');
      setApiError(message || t('messages.loginError'));
    }
  };

  const labelAlign = direction === 'rtl' ? 'text-right' : 'text-left';
  const fieldBorder = (hasError: boolean) =>
    hasError ? 'border-red-400' : 'border-gray-300';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-8">{t('login.title')}</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {apiError && (
            <div
              role="alert"
              className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {apiError}
            </div>
          )}

          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelAlign}`}>
              {t('login.form.email.label')}
            </label>
            <input
              type="email"
              autoComplete="email"
              disabled={isLoading}
              placeholder={t('login.form.email.placeholder')}
              className={`${inputClass} ${fieldBorder(!!errors.email)} ${labelAlign}`}
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelAlign}`}>
              {t('login.form.password.label')}
            </label>
            <input
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              placeholder={t('login.form.password.placeholder')}
              className={`${inputClass} ${fieldBorder(!!errors.password)} ${labelAlign}`}
              {...register('password')}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                disabled={isLoading}
                className="h-4 w-4 text-[#52B4D9] focus:ring-[#52B4D9] border-gray-300 rounded"
                {...register('rememberMe')}
              />
              <label className="m-2 block text-sm text-gray-700">
                {t('login.form.rememberMe')}
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-[#52B4D9] hover:underline"
            >
              {t('login.form.forgotPassword')}
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#52B4D9] text-white py-2 px-4 rounded-md hover:bg-[#3DA3C9] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? t('messages.submitting') : t('login.form.submitButton')}
          </button>

          <div className="text-center text-sm text-gray-600">
            {t('login.form.noAccount')}{' '}
            <Link to="/signup" className="text-[#52B4D9] hover:underline">
              {t('login.form.createAccount')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
