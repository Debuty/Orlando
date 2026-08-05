import { z } from 'zod';

type TranslateFn = (key: string) => string;

export function createContactSchema(t: TranslateFn) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, t('validation.required'))
      .min(2, t('validation.nameMin')),
    email: z
      .string()
      .trim()
      .min(1, t('validation.required'))
      .email(t('validation.emailInvalid')),
    phone: z
      .string()
      .trim()
      .min(1, t('validation.required'))
      .min(7, t('validation.phoneInvalid')),
    message: z
      .string()
      .trim()
      .min(1, t('validation.required'))
      .min(5, t('validation.messageMin')),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
