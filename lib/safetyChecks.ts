import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_BRAINTREE_SDK_TOKENIZATION_KEY: z.string().min(1),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1),
  BRAINTREE_MERCHANT_ID: z.string().min(1),
  BRAINTREE_PUBLIC_KEY: z.string().min(1),
  BRAINTREE_PRIVATE_KEY: z.string().min(1),
});

export const validateEnv = () => {
  envSchema.parse(process.env);
};
