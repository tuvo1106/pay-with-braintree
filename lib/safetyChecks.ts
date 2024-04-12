import { z } from "zod"

const envSchema = z.object({
    NEXT_PUBLIC_BRAINTREE_SDK_TOKENIZATION_KEY: z.string().min(1),
    BRAINTREE_MERCHANT_ID: z.string().min(1),
    BRAINTREE_PUBLIC_KEY: z.string().min(1),
    BRAINTREE_PRIVATE_KEY: z.string().min(1),
})

export const validateEnv = () => {
    envSchema.parse(process.env)
}
