import { NextResponse } from "next/server";
import { getBraintreeGateway } from "@/lib/braintree-server";
import getLogger from "@/lib/logging/logger";

export async function POST(req: Request) {
    const logger = getLogger("/api/v1/customer");
    const gateway = getBraintreeGateway();
    try {
        const params = await req.json();
        logger.info(`params: ${params}`);
        const { firstName, lastName, company, email, phone } = params;

        // check if email exists
        if (email) {
            return NextResponse.json({});
        }

        // defauit ID:
        // 84718442536

        const res = await gateway.customer.create({
            firstName,
            lastName,
            company,
            email,
            phone,
        });
        if (!res.success) {
            logger.error(res.errors);
        } else {
            logger.info(res);
        }

        return NextResponse.json(res);
    } catch (error) {
        logger.error(error);
    }
}
