import { useMemo, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { RootState } from '../../../store/index';
import { useSignupMutation } from '../../shared/api/orlandoApi';
import {
  createSignupSchema,
  type SignupFormValues,
} from '../schemas/signupSchema';

const inputClass =
  'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#52B4D9] focus:border-transparent disabled:opacity-60';

const Signup = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const { t, i18n } = useTranslation('auth');
  const direction = useSelector((state: RootState) => state.locale.dir);
  const navigate = useNavigate();
  const location = useLocation();
  const [signup, { isLoading }] = useSignupMutation();

  const schema = useMemo(() => createSignupSchema(t), [t, i18n.language]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setApiError(null);
    try {
      await signup({
        name: data.fullName.trim(),
        email: data.email.trim(),
        phone: data.phoneNumber.trim(),
        password: data.password,
        confirmPassword: data.confirmPassword,
      }).unwrap();

      const from = (location.state as { from?: string } | null)?.from;
      navigate(from && from.startsWith('/') ? from : '/', { replace: true });
    } catch (err) {
      const message =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : t('messages.signupError');
      setApiError(message || t('messages.signupError'));
    }
  };

  const labelAlign = direction === 'rtl' ? 'text-right' : 'text-left';
  const fieldBorder = (hasError: boolean) =>
    hasError ? 'border-red-400' : 'border-gray-300';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-8">{t('signup.title')}</h1>

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
              {t('signup.form.fullName.label')}
            </label>
            <input
              type="text"
              autoComplete="name"
              disabled={isLoading}
              placeholder={t('signup.form.fullName.placeholder')}
              className={`${inputClass} ${fieldBorder(!!errors.fullName)} ${labelAlign}`}
              {...register('fullName')}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelAlign}`}>
              {t('signup.form.email.label')}
            </label>
            <input
              type="email"
              autoComplete="email"
              disabled={isLoading}
              placeholder={t('signup.form.email.placeholder')}
              className={`${inputClass} ${fieldBorder(!!errors.email)} ${labelAlign}`}
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelAlign}`}>
              {t('signup.form.phoneNumber.label')}
            </label>
            <input
              type="tel"
              autoComplete="tel"
              disabled={isLoading}
              placeholder={t('signup.form.phoneNumber.placeholder')}
              className={`${inputClass} ${fieldBorder(!!errors.phoneNumber)} ${labelAlign}`}
              {...register('phoneNumber')}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelAlign}`}>
              {t('signup.form.password.label')}
            </label>
            <input
              type="password"
              autoComplete="new-password"
              disabled={isLoading}
              placeholder={t('signup.form.password.placeholder')}
              className={`${inputClass} ${fieldBorder(!!errors.password)} ${labelAlign}`}
              {...register('password')}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelAlign}`}>
              {t('signup.form.confirmPassword.label')}
            </label>
            <input
              type="password"
              autoComplete="new-password"
              disabled={isLoading}
              placeholder={t('signup.form.confirmPassword.placeholder')}
              className={`${inputClass} ${fieldBorder(!!errors.confirmPassword)} ${labelAlign}`}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-start">
              <input
                type="checkbox"
                disabled={isLoading}
                className="h-4 w-4 text-[#52B4D9] focus:ring-[#52B4D9] border-gray-300 rounded"
                {...register('agreeToTerms')}
              />
              <label className="m-2 block text-sm text-gray-700">
                {t('signup.form.agreeToTerms')}{' '}
                <Link to="/terms" className="text-[#52B4D9] hover:underline">
                  {t('signup.form.termsAndConditions')}
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#52B4D9] text-white py-2 px-4 rounded-md hover:bg-[#3DA3C9] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? t('messages.submitting') : t('signup.form.submitButton')}
          </button>

          <div className="text-center text-sm text-gray-600">
            {t('signup.form.hasAccount')}{' '}
            <Link to="/login" className="text-[#52B4D9] hover:underline">
              {t('signup.form.login')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
