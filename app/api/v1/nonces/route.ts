import { NextResponse } from "next/server";
import { US_BANK_ACCOUNT } from "@/lib/constants";
import { db } from "@/lib/db";
import getLogger from "@/lib/logging/logger";

export async function POST(req: Request) {
    const logger = getLogger("POST /api/v1/nonces");
    try {
        const { nonce } = await req.json();

        const res = await db.nonce.create({
            data: {
                paymentInstrumentType: US_BANK_ACCOUNT,
                token: nonce,
            },
        });

        logger.info(`Record created: ${JSON.stringify(res)} `);

        return NextResponse.json(res);
    } catch (error) {
        logger.error(error);
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
        return new NextResponse("Internal error", { status: 500 });
    }
}
