import { z } from 'zod';

type TranslateFn = (key: string) => string;

export function createLoginSchema(t: TranslateFn) {
  return z.object({
    email: z
      .string()
      .trim()
      .min(1, t('validation.required'))
      .email(t('validation.emailInvalid')),
    password: z.string().min(1, t('validation.required')),
    rememberMe: z.boolean(),
  });
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
