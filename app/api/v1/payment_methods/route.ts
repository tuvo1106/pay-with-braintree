import { INTERNAL_ERROR, INVALID_PARAMS } from "@/lib/constants";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBraintreeGateway } from "@/lib/braintree-server";
import getLogger from "@/lib/logging/logger";

export async function POST(req: Request) {
    const logger = getLogger("POST /api/v1/payment_methods");

    try {
        const gateway = await getBraintreeGateway();
        const params = await req.json();
        logger.info(`Params: ${params}`);
        const { paymentMethodNonce, braintreeCustomerId, verificationMethod } =
            params;

        if (
            !paymentMethodNonce ||
            !braintreeCustomerId ||
            !verificationMethod
        ) {
            logger.error(INVALID_PARAMS);
            return new NextResponse(INVALID_PARAMS, { status: 422 });
        }

        const response = await gateway.paymentMethod.create({
            customerId: braintreeCustomerId,
            paymentMethodNonce,
            options: {
                // @ts-ignore
                usBankAccountVerificationMethod: verificationMethod,
            },
        });
        logger.info(response);

        if (!response.success) {
            logger.info("Error creating payment method");
            return new NextResponse(INTERNAL_ERROR, { status: 500 });
        }

        const btPaymentMethod = response.paymentMethod;
        logger.info(
            `Braintree payment method created: ${JSON.stringify(
                btPaymentMethod
            )} `
        );

        const lastVerification =
            // @ts-ignore
            btPaymentMethod.verifications[
                // @ts-ignore
                btPaymentMethod.verifications.length - 1
            ];

        const record = await db.paymentMethod.create({
            data: {
                braintreePublicId: btPaymentMethod.token,
                verified: lastVerification.status === "verified",
                status: lastVerification.processorResponseText || "",
            },
        });

        logger.info(`Record created: ${JSON.stringify(record)} `);

        return NextResponse.json(record);
    } catch (error) {
        logger.error(error);
        return new NextResponse(INTERNAL_ERROR, { status: 500 });
    }
}

export async function GET(req: Request) {
    const logger = getLogger("GET /api/v1/payment_methods");

    try {
        const paymentMethods = await db.paymentMethod.findMany({});
        logger.info(`Payment methods found: ${paymentMethods.length}`);

        return NextResponse.json(paymentMethods);
    } catch (error) {
        logger.error(error);
        return new NextResponse(INTERNAL_ERROR, { status: 500 });
    }
}
