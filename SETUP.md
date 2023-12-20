# Setup

## Sign Up for Clerk

-   [Register here](https://clerk.com/)
-   Make sure to set these environment variables in `.env` from app root

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-publishable-key>
CLERK_SECRET_KEY=<your-client-secret-key>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

## Sign Up for Braintree

-   [Register here](https://www.braintreepayments.com/sandbox)
-   Make sure to set these environment variables in `.env` from app root

```
NEXT_PUBLIC_BRAINTREE_SDK_TOKENIZATION_KEY=<your-tokenization-key>
BRAINTREE_MERCHANT_ID=<your-public-id>
BRAINTREE_PUBLIC_KEY=<your-public-key>
BRAINTREE_PRIVATE_KEY=<your-private-key>
```
