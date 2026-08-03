import { useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';
import { useCreateChaletMutation } from '../../../shared/api/orlandoApi';
import {
  createChaletSchema,
  type CreateChaletFormInput,
  type CreateChaletFormValues,
} from '../../schemas/createChaletSchema';

const inputClass =
  'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2] focus:border-transparent disabled:opacity-60';

const CreateChaletForm = () => {
  const { t, i18n } = useTranslation('dashboard');
  const direction = useSelector((state: RootState) => state.locale.dir);
  const [featureDraft, setFeatureDraft] = useState('');
  const [imageDraft, setImageDraft] = useState('');
  const [listError, setListError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [createChalet, { isLoading }] = useCreateChaletMutation();

  const schema = useMemo(() => createChaletSchema(t), [t, i18n.language]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateChaletFormInput, unknown, CreateChaletFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      location: '',
      price: '',
      capacity: '',
      rating: '',
      features: [],
      images: [],
      isActive: true,
    },
  });

  const features = watch('features') ?? [];
  const images = watch('images') ?? [];
  const labelAlign = direction === 'rtl' ? 'text-right' : 'text-left';
  const fieldBorder = (hasError: boolean) =>
    hasError ? 'border-red-400' : 'border-gray-300';

  const addFeature = () => {
    const value = featureDraft.trim();
    setListError(null);
    if (!value) {
      setListError(t('createChalet.validation.featureEmpty'));
      return;
    }
    if (features.includes(value)) {
      setListError(t('createChalet.validation.featureDuplicate'));
      return;
    }
    setValue('features', [...features, value], { shouldValidate: true });
    setFeatureDraft('');
  };

  const removeFeature = (item: string) => {
    setValue(
      'features',
      features.filter((f) => f !== item),
      { shouldValidate: true }
    );
  };

  const addImage = () => {
    const value = imageDraft.trim();
    setListError(null);
    if (!value) {
      setListError(t('createChalet.validation.imageEmpty'));
      return;
    }
    if (images.includes(value)) {
      setListError(t('createChalet.validation.imageDuplicate'));
      return;
    }
    setValue('images', [...images, value], { shouldValidate: true });
    setImageDraft('');
  };

  const removeImage = (item: string) => {
    setValue(
      'images',
      images.filter((img) => img !== item),
      { shouldValidate: true }
    );
  };

  const onSubmit = async (data: CreateChaletFormValues) => {
    setApiError(null);
    setSuccessMessage(null);
    setListError(null);

    try {
      await createChalet({
        name: data.name,
        description: data.description,
        location: data.location,
        price: data.price,
        capacity: data.capacity,
        rating: data.rating ?? null,
        features: data.features,
        images: data.images,
        isActive: data.isActive,
      }).unwrap();

      setSuccessMessage(t('createChalet.messages.success'));
      reset();
      setFeatureDraft('');
      setImageDraft('');
    } catch (err) {
      const message =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : t('createChalet.messages.error');
      setApiError(message || t('createChalet.messages.error'));
    }
  };

  const onReset = () => {
    reset();
    setFeatureDraft('');
    setImageDraft('');
    setListError(null);
    setApiError(null);
    setSuccessMessage(null);
  };

  return (
    <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {t('createChalet.title')}
        </h2>
        <p className="mt-1 text-sm text-gray-600">{t('createChalet.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {successMessage && (
          <div
            role="status"
            className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800"
          >
            {successMessage}
          </div>
        )}

        {(apiError || listError) && (
          <div
            role="alert"
            className={`rounded-md border px-3 py-2 text-sm ${
              apiError
                ? 'border-red-200 bg-red-50 text-red-700'
                : 'border-amber-200 bg-amber-50 text-amber-800'
            }`}
          >
            {apiError || listError}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelAlign}`}>
              {t('createChalet.fields.name.label')}
            </label>
            <input
              type="text"
              disabled={isLoading}
              placeholder={t('createChalet.fields.name.placeholder')}
              className={`${inputClass} ${fieldBorder(!!errors.name)} ${labelAlign}`}
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelAlign}`}>
              {t('createChalet.fields.description.label')}
            </label>
            <textarea
              rows={4}
              disabled={isLoading}
              placeholder={t('createChalet.fields.description.placeholder')}
              className={`${inputClass} resize-y ${fieldBorder(!!errors.description)} ${labelAlign}`}
              {...register('description')}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelAlign}`}>
              {t('createChalet.fields.location.label')}
            </label>
            <input
              type="text"
              disabled={isLoading}
              placeholder={t('createChalet.fields.location.placeholder')}
              className={`${inputClass} ${fieldBorder(!!errors.location)} ${labelAlign}`}
              {...register('location')}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelAlign}`}>
              {t('createChalet.fields.price.label')}
            </label>
            <input
              type="number"
              min={0}
              step="0.01"
              disabled={isLoading}
              placeholder={t('createChalet.fields.price.placeholder')}
              className={`${inputClass} ${fieldBorder(!!errors.price)} ${labelAlign}`}
              {...register('price')}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelAlign}`}>
              {t('createChalet.fields.capacity.label')}
            </label>
            <input
              type="number"
              min={1}
              step={1}
              disabled={isLoading}
              placeholder={t('createChalet.fields.capacity.placeholder')}
              className={`${inputClass} ${fieldBorder(!!errors.capacity)} ${labelAlign}`}
              {...register('capacity')}
            />
            {errors.capacity && (
              <p className="mt-1 text-sm text-red-600">{errors.capacity.message}</p>
            )}
          </div>

          <div>
            <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelAlign}`}>
              {t('createChalet.fields.rating.label')}
            </label>
            <input
              type="number"
              min={0}
              max={5}
              step={0.1}
              disabled={isLoading}
              placeholder={t('createChalet.fields.rating.placeholder')}
              className={`${inputClass} ${fieldBorder(!!errors.rating)} ${labelAlign}`}
              {...register('rating')}
            />
            {errors.rating && (
              <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelAlign}`}>
            {t('createChalet.fields.features.label')}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={featureDraft}
              disabled={isLoading}
              onChange={(e) => setFeatureDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addFeature();
                }
              }}
              placeholder={t('createChalet.fields.features.placeholder')}
              className={`${inputClass} border-gray-300 ${labelAlign}`}
            />
            <button
              type="button"
              onClick={addFeature}
              disabled={isLoading}
              className="shrink-0 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-60"
            >
              {t('createChalet.fields.features.add')}
            </button>
          </div>
          {features.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="inline-flex items-center gap-2 rounded-full bg-[#00B5E2]/10 px-3 py-1 text-sm text-[#0072BC]"
                >
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(feature)}
                    disabled={isLoading}
                    className="font-bold leading-none hover:text-red-600 disabled:opacity-60"
                    aria-label={`remove ${feature}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label className={`block text-sm font-medium text-gray-700 mb-1 ${labelAlign}`}>
            {t('createChalet.fields.images.label')}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              value={imageDraft}
              disabled={isLoading}
              onChange={(e) => setImageDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addImage();
                }
              }}
              placeholder={t('createChalet.fields.images.placeholder')}
              className={`${inputClass} ${fieldBorder(!!errors.images)} ${labelAlign}`}
            />
            <button
              type="button"
              onClick={addImage}
              disabled={isLoading}
              className="shrink-0 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-60"
            >
              {t('createChalet.fields.images.add')}
            </button>
          </div>
          {errors.images && (
            <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
          )}
          {images.length > 0 && (
            <ul className="mt-3 space-y-2">
              {images.map((url) => (
                <li
                  key={url}
                  className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-2"
                >
                  <img
                    src={url}
                    alt=""
                    className="h-14 w-20 shrink-0 rounded object-cover bg-gray-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.visibility = 'hidden';
                    }}
                  />
                  <span className="min-w-0 flex-1 break-all text-sm text-gray-600">{url}</span>
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    disabled={isLoading}
                    className="shrink-0 text-sm font-semibold text-red-600 hover:underline disabled:opacity-60"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <input
                id="isActive"
                type="checkbox"
                checked={field.value}
                disabled={isLoading}
                onChange={(e) => field.onChange(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#00B5E2] focus:ring-[#00B5E2]"
              />
            )}
          />
          <label htmlFor="isActive" className="text-sm text-gray-700">
            {t('createChalet.fields.isActive')}
          </label>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-2">
          <button
            type="button"
            onClick={onReset}
            disabled={isLoading}
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60"
          >
            {t('createChalet.reset')}
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-[#00B5E2] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#33C3E7] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? t('createChalet.messages.submitting') : t('createChalet.submit')}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateChaletForm;
