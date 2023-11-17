import getLogger from "@/utils/logging/logger";
import { NextResponse } from "next/server";
import { getBraintreeGateway } from "@/utils/braintree-server";

export async function POST(req: Request) {
    const logger = getLogger("/api/v1/payment_methods");
    const gateway = getBraintreeGateway();
    try {
        const { nonce } = await req.json();
        logger.info(`nonce: ${nonce}`);

        const res = await gateway.paymentMethod.create({
            customerId: "84718442536",
            paymentMethodNonce: nonce,
            options: {
                // @ts-ignore
                usBankAccountVerificationMethod: "network_check",
            },
        });
        if (!res.success) {
            logger.error(res.errors);
        } else {
            logger.info("success!");
            logger.info(res);
        }

        return NextResponse.json(nonce);
    } catch (error) {
        logger.error(error);
    }
}
