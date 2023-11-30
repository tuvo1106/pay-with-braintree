import { INTERNAL_ERROR, INVALID_PARAMS } from "@/lib/constants";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getBraintreeGateway } from "@/lib/braintree-server";
import getLogger from "@/lib/logging/logger";

export async function POST(req: Request) {
    const logger = getLogger("POST /api/v1/customer");

    try {
        const gateway = getBraintreeGateway();
        const params = await req.json();
        logger.info(`Params: ${JSON.stringify(params)}`);
        const { firstName, lastName, company, email, phone } = params;

        if (!firstName || !lastName || !company || !email || !phone) {
            logger.error(INVALID_PARAMS);
            return new NextResponse(INVALID_PARAMS, { status: 422 });
        }

        const response = await gateway.customer.create({
            firstName,
            lastName,
            company,
            email,
            phone,
        });

        if (!response.success) {
            logger.error(`Error creating customer: ${response}`);
            return new NextResponse(INTERNAL_ERROR, { status: 500 });
        }

        const btCustomer = response.customer;
        logger.info(
            `Braintree customer created: ${JSON.stringify(btCustomer)} `
        );

        const record = await db.customer.create({
            data: {
                firstName,
                lastName,
                company,
                email,
                phone,
                braintreePublicId: btCustomer.id,
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
    const logger = getLogger("GET /api/v1/customers");

    try {
        const customers = await db.customer.findMany({});
        logger.info(`Customers found: ${customers.length}`);

        return NextResponse.json(customers);
    } catch (error) {
        logger.error(error);
        return new NextResponse(INTERNAL_ERROR, { status: 500 });
    }
}
