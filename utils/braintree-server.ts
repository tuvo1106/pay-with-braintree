"use server";

import braintree from "braintree";

export const getBraintreeGateway = () => {
    if (
        !process.env.BRAINTREE_MERCHANT_ID ||
        !process.env.BRAINTREE_PUBLIC_KEY ||
        !process.env.BRAINTREE_PRIVATE_KEY
    ) {
        throw new Error("Braintree SDK not configured correctly");
    }

    return new braintree.BraintreeGateway({
        environment: braintree.Environment.Sandbox,
        merchantId: process.env.BRAINTREE_MERCHANT_ID,
        publicKey: process.env.BRAINTREE_PUBLIC_KEY,
        privateKey: process.env.BRAINTREE_PRIVATE_KEY,
    });
};
