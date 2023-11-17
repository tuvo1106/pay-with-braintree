import getLogger from "@/utils/logging/logger";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const logger = getLogger("/api/v1/nonces");
    try {
        const { nonce } = await req.json();
        logger.info(`nonce: ${nonce}`);

        return NextResponse.json(nonce);
    } catch (error) {
        logger.error(error);
    }
}
