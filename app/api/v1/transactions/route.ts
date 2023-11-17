import { NextResponse } from "next/server";
import { getBraintreeGateway } from "@/utils/braintree-server";
import getLogger from "@/utils/logging/logger";

export async function POST(req: Request) {
    const logger = getLogger("/api/v1/transactions");
    try {
        const gateway = getBraintreeGateway();
        const params = await req.json();
        logger.info(`params: ${params}`);
        const { amount, paymentMethodToken } = params;

        const res = await gateway.transaction.sale({
            amount,
            paymentMethodToken,
            options: {
                submitForSettlement: true,
            },
        });

        if (res.success) {
            logger.info("SUCCESS");
            logger.info(`transaction public_id: ${res.transaction.id}`);
        } else {
            logger.info(res);
            logger.error(res.errors);
        }

        return NextResponse.json({});
    } catch (error) {
        logger.error(error);
        logger.error(process.env);
        return new NextResponse("Internal error", { status: 500 });
    }
}
