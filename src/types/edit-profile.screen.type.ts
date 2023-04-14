import { z } from 'zod';

import {
  ERROR_INCORRECT_PHONE_FORMAT,
  ERROR_MIN_VAL,
  ERROR_REQUIRED_FIELD,
} from '@/utils/error.messages';

export const EditProfileSchema = z
  .object({
    firstname: z
      .string({ required_error: ERROR_REQUIRED_FIELD })
      .min(1, ERROR_MIN_VAL(1)),
    lastname: z
      .string({ required_error: ERROR_REQUIRED_FIELD })
      .min(1, ERROR_MIN_VAL(1)),
    phone: z
      .string({ required_error: ERROR_REQUIRED_FIELD })
      .regex(/^\+7 \(\d{3}\) \d{3} \d{4}$/, ERROR_INCORRECT_PHONE_FORMAT),
  })
  .required();

export type EditProfileFormData = z.infer<typeof EditProfileSchema>;
