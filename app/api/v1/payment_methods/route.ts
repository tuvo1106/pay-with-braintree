import {
    INTERNAL_ERROR,
    INVALID_PARAMS,
    US_BANK_ACCOUNT,
    VENMO_ACCOUNT,
} from "@/lib/constants"

import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getBraintreeGateway } from "@/lib/braintree-server"
import getLogger from "@/lib/logging/logger"
import { paymentMethodFormSchema } from "@/schema"

export async function POST(req: Request) {
    const logger = getLogger("POST /api/v1/payment_methods")

    try {
        const gateway = await getBraintreeGateway()
        const params = await req.json()
        logger.info(`Params: ${JSON.stringify(params)}`)

        const validatedParams = paymentMethodFormSchema.safeParse(params)

        if (!validatedParams.success) {
            logger.error(INVALID_PARAMS)
            return new NextResponse(INVALID_PARAMS, { status: 422 })
        }

        const {
            paymentInstrument,
            paymentMethodNonce,
            braintreeCustomerId,
            verificationMethod,
            verificationAddOns,
        } = validatedParams.data

        let options: any = {}
        if (paymentInstrument === US_BANK_ACCOUNT) {
            options = {
                usBankAccountVerificationMethod: verificationMethod,
            }

            if (verificationAddOns === "customer_verification") {
                options["verificationAddOns"] = "CUSTOMER_VERIFICATION"
            }
        }

        const response = await gateway.paymentMethod.create({
            customerId: braintreeCustomerId,
            paymentMethodNonce,
            options: options,
        })
        logger.info(response)

        if (!response.success) {
            logger.error("Error creating payment method")
            return new NextResponse(INTERNAL_ERROR, { status: 500 })
        }

        const btPaymentMethod = response.paymentMethod
        logger.info(
            `Braintree payment method created: ${JSON.stringify(
                btPaymentMethod,
            )} `,
        )

        let record: any
        if (paymentInstrument === US_BANK_ACCOUNT) {
            const lastVerification =
                // @ts-ignore
                btPaymentMethod.verifications[
                    // @ts-ignore
                    btPaymentMethod.verifications.length - 1
                ]

            record = await db.paymentMethod.create({
                data: {
                    paymentInstrument: US_BANK_ACCOUNT,
                    braintreePublicId: btPaymentMethod.token,
                    verified: lastVerification.status === "verified",
                    status: lastVerification.processorResponseText || "",
                },
            })
        } else {
            record = await db.paymentMethod.create({
                data: {
                    paymentInstrument: VENMO_ACCOUNT,
                    braintreePublicId: btPaymentMethod.token,
                },
            })
        }

        logger.info(`Record created: ${JSON.stringify(record)} `)

        return NextResponse.json(record)
    } catch (error) {
        logger.error(error)
        return new NextResponse(INTERNAL_ERROR, { status: 500 })
    }
}

export async function GET(req: Request) {
    const logger = getLogger("GET /api/v1/payment_methods")

    try {
        const paymentMethods = await db.paymentMethod.findMany({})
        logger.info(`Payment methods found: ${paymentMethods.length}`)

        return NextResponse.json(paymentMethods)
    } catch (error) {
        logger.error(error)
        return new NextResponse(INTERNAL_ERROR, { status: 500 })
    }
}
