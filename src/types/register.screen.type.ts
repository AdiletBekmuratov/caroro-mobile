import {
  ERROR_INCORRECT_EMAIL,
  ERROR_MIN_VAL,
  ERROR_PASSWORD_NOT_MATCH,
  ERROR_REQUIRED_FIELD,
  ERROR_WEAK_PASSWORD,
} from '@/utils/error.messages';
import { z } from 'zod';

export const RegisterSchema = z
  .object({
    email: z
      .string({ required_error: ERROR_REQUIRED_FIELD })
      .email(ERROR_INCORRECT_EMAIL),
    username: z
      .string({ required_error: ERROR_REQUIRED_FIELD })
      .min(4, ERROR_MIN_VAL(4)),
    password: z
      .string({ required_error: ERROR_REQUIRED_FIELD })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*-.+_])(?=.{8,})/,
        ERROR_WEAK_PASSWORD,
      ),
    confirm: z.string({ required_error: ERROR_REQUIRED_FIELD }),
  })
  .required()
  .refine(data => data.password === data.confirm, {
    message: ERROR_PASSWORD_NOT_MATCH,
    path: ['confirm'],
  });

export type RegisterFormData = z.infer<typeof RegisterSchema>;
