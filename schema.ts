import { z } from "zod"

export const accountTypeEnum = z.enum(["SAVINGS", "CHECKING", "UNKNOWN"])
export const ownershipTypeEnum = z.enum(["BUSINESS", "PERSONAL", "UNKNOWN"])

export const achNonceFormSchema = z.object({
    accountNumber: z
        .string()
        .min(1, { message: "Account number is required." }),
    routingNumber: z
        .string()
        .min(1, { message: "Routing number is required." }),
    accountHolderName: z
        .string()
        .min(1, { message: "Account holder name is required." }),
    accountType: accountTypeEnum,
    ownershipType: ownershipTypeEnum,
})

export const customerFormSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    email: z.string().min(1, { message: "Email is required." }),
    company: z.string(),
    phone: z.string(),
})

export const paymentTypeEnum = z.enum(["ideal", "sofort"])

export const lpmNonceSchema = z.object({
    paymentType: paymentTypeEnum,
    amount: z.string().min(1, { message: "Amount is required." }),
    currencyCode: z.string().min(1, { message: "Amount is required." }),
    givenName: z.string().min(1, { message: "First name is required." }),
    surname: z.string().min(1, { message: "Last name is required." }),
})

export const transactionFormSchema = z.object({
    paymentMethodToken: z
        .string()
        .min(1, { message: "Payment method token is required." }),
    amount: z.string().min(1, { message: "Amount is required" }),
})

export const verificationMethodEnum = z.enum([
    "network_check",
    "independent_check",
    "micro_transfers",
    "unknown",
])

export const verificationAddOnsEnum = z.enum([
    "customer_verification",
    "unknown",
])

export const paymentMethodFormSchema = z.object({
    paymentInstrument: z
        .string()
        .min(1, { message: "Payment Method Nonce is required." }),
    paymentMethodNonce: z
        .string()
        .min(1, { message: "Payment Method Nonce is required." }),
    braintreeCustomerId: z
        .string()
        .min(1, { message: "Braintree Customer ID is required." }),
    verificationMethod: verificationMethodEnum,
    verificationAddOns: verificationAddOnsEnum,
})

export const noncesRouteSchema = z.object({
    nonce: z.string().min(1, { message: "Nonce is required." }),
    type: z.string().min(1, { message: "Nonce is required." }),
    details: z.any(),
})
