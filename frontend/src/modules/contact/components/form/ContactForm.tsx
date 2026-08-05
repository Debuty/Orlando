import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSendContactMessageMutation } from '../../../shared/api/orlandoApi';
import {
  createContactSchema,
  type ContactFormValues,
} from '../../schemas/contactSchema';

const inputClass =
  'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00B5E2] focus:border-transparent disabled:opacity-60';

const ContactForm = () => {
  const { t, i18n } = useTranslation('contact');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [sendContact, { isLoading }] = useSendContactMessageMutation();

  const schema = useMemo(() => createContactSchema(t), [t, i18n.language]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const fieldBorder = (hasError: boolean) =>
    hasError ? 'border-red-400' : 'border-gray-300';

  const onSubmit = async (data: ContactFormValues) => {
    setApiError(null);
    setSuccessMessage(null);

    try {
      await sendContact({
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        message: data.message.trim(),
      }).unwrap();

      setSuccessMessage(t('messages.success'));
      reset();
    } catch (err) {
      const message =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : t('messages.error');
      setApiError(message || t('messages.error'));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm p-6 md:p-8"
    >
      <h2 className="text-2xl font-cairo font-semibold mb-6">{t('form.title')}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {successMessage && (
          <div
            role="status"
            className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800"
          >
            {successMessage}
          </div>
        )}

        {apiError && (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {apiError}
          </div>
        )}

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.fields.fullName.label')}
          </label>
          <input
            type="text"
            id="name"
            autoComplete="name"
            disabled={isLoading}
            placeholder={t('form.fields.fullName.placeholder')}
            className={`${inputClass} ${fieldBorder(!!errors.name)}`}
            {...register('name')}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.fields.email.label')}
          </label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            disabled={isLoading}
            placeholder={t('form.fields.email.placeholder')}
            className={`${inputClass} ${fieldBorder(!!errors.email)}`}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.fields.phone.label')}
          </label>
          <input
            type="tel"
            id="phone"
            autoComplete="tel"
            disabled={isLoading}
            placeholder={t('form.fields.phone.placeholder')}
            className={`${inputClass} ${fieldBorder(!!errors.phone)}`}
            {...register('phone')}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.fields.message.label')}
          </label>
          <textarea
            id="message"
            rows={4}
            disabled={isLoading}
            placeholder={t('form.fields.message.placeholder')}
            className={`${inputClass} resize-y ${fieldBorder(!!errors.message)}`}
            {...register('message')}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#00B5E2] hover:bg-[#33C3E7] text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? t('messages.submitting') : t('form.submitButton')}
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
