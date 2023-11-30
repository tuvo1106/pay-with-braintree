export const validateEnv = () => {
    return (
        process.env.NEXT_PUBLIC_BRAINTREE_SDK_TOKENIZATION_KEY &&
        process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
        process.env.CLERK_SECRET_KEY &&
        process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL &&
        process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL &&
        process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL &&
        process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL &&
        process.env.BRAINTREE_MERCHANT_ID &&
        process.env.BRAINTREE_PUBLIC_KEY &&
        process.env.BRAINTREE_PRIVATE_KEY
    );
};
