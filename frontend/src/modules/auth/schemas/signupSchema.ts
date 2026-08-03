import { z } from 'zod';

type TranslateFn = (key: string) => string;

export function createSignupSchema(t: TranslateFn) {
  return z
    .object({
      fullName: z
        .string()
        .trim()
        .min(1, t('validation.required'))
        .min(2, t('validation.required')),
      email: z
        .string()
        .trim()
        .min(1, t('validation.required'))
        .email(t('validation.emailInvalid')),
      phoneNumber: z
        .string()
        .trim()
        .min(1, t('validation.required'))
        .min(7, t('validation.phoneInvalid')),
      password: z
        .string()
        .min(1, t('validation.required'))
        .min(6, t('validation.passwordTooShort')),
      confirmPassword: z.string().min(1, t('validation.required')),
      agreeToTerms: z.boolean().refine((v) => v === true, {
        message: t('validation.agreeToTerms'),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('validation.passwordsDoNotMatch'),
      path: ['confirmPassword'],
    });
}

export type SignupFormValues = z.infer<ReturnType<typeof createSignupSchema>>;
