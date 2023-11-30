import { INTERNAL_ERROR, INVALID_PARAMS, US_BANK_ACCOUNT } from "@/lib/constants";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import getLogger from "@/lib/logging/logger";

export async function POST(req: Request) {
    const logger = getLogger("POST /api/v1/nonces");

    try {
        const params = await req.json();
        logger.info(`Params: ${JSON.stringify(params)}`);
        const { nonce } = params;

        if (!nonce) {
            logger.error(INVALID_PARAMS);
            return new NextResponse(INVALID_PARAMS, { status: 422 });
        }

        const record = await db.nonce.create({
            data: {
                paymentInstrumentType: US_BANK_ACCOUNT,
                token: nonce,
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
    const logger = getLogger("GET /api/v1/nonces");

    try {
        const nonces = await db.nonce.findMany({});
        logger.info(`Nonces found: ${nonces.length}`);

        return NextResponse.json(nonces);
    } catch (error) {
        logger.error(error);
        return new NextResponse(INTERNAL_ERROR, { status: 500 });
    }
}
