import { z } from 'zod';

type TranslateFn = (key: string) => string;

export function createChaletSchema(t: TranslateFn) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, t('createChalet.validation.required'))
      .min(2, t('createChalet.validation.nameMin')),
    description: z
      .string()
      .trim()
      .min(1, t('createChalet.validation.required'))
      .min(10, t('createChalet.validation.descriptionMin')),
    location: z.string().trim().min(1, t('createChalet.validation.required')),
    price: z.coerce
      .number({ error: t('createChalet.validation.priceInvalid') })
      .positive(t('createChalet.validation.pricePositive')),
    capacity: z.coerce
      .number({ error: t('createChalet.validation.capacityInvalid') })
      .int(t('createChalet.validation.capacityInvalid'))
      .min(1, t('createChalet.validation.capacityMin')),
    rating: z
      .union([z.string(), z.number(), z.null(), z.undefined(), z.literal('')])
      .transform((v) => {
        if (v === '' || v === null || v === undefined) return null;
        const n = typeof v === 'number' ? v : Number(v);
        return Number.isFinite(n) ? n : null;
      })
      .refine(
        (v) => v === null || (v >= 0 && v <= 5),
        t('createChalet.validation.ratingRange')
      ),
    features: z.array(z.string().trim().min(1)),
    images: z
      .array(z.string().trim().url(t('createChalet.validation.imageUrl')))
      .min(1, t('createChalet.validation.imagesMin')),
    isActive: z.boolean(),
  });
}

export type CreateChaletSchema = ReturnType<typeof createChaletSchema>;
/** Values in the form (before / during resolution) */
export type CreateChaletFormInput = z.input<CreateChaletSchema>;
/** Values after Zod parse (submit handler) */
export type CreateChaletFormValues = z.output<CreateChaletSchema>;
