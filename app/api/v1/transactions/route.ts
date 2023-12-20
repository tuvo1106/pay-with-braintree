import { INTERNAL_ERROR, INVALID_PARAMS } from "@/lib/constants";

import { NextResponse } from "next/server";
import currency from "currency.js";
import { db } from "@/lib/db";
import { getBraintreeGateway } from "@/lib/braintree-server";
import getLogger from "@/lib/logging/logger";
import { transactionFormSchema } from "@/schema";

export async function POST(req: Request) {
  const logger = getLogger("/api/v1/transactions");

  try {
    const gateway = getBraintreeGateway();
    const params = await req.json();
    logger.info(`Params: ${JSON.stringify(params)}`);

    const validateParams = transactionFormSchema.safeParse(params);

    if (!validateParams.success) {
      logger.error(INVALID_PARAMS);
      return new NextResponse(INVALID_PARAMS, { status: 422 });
    }

    const { amount, paymentMethodToken } = validateParams.data;

    const response = await gateway.transaction.sale({
      amount,
      paymentMethodToken,
      options: {
        submitForSettlement: true,
      },
    });

    if (!response.success) {
      logger.error("Error creating transaction");
      return new NextResponse(INTERNAL_ERROR, { status: 500 });
    }

    const btTransaction = response.transaction;
    logger.info(
      `Braintree transaction created: ${JSON.stringify(btTransaction)} `
    );

    const record = await db.transaction.create({
      data: {
        braintreePublicId: btTransaction.id,
        amount: currency(btTransaction.amount).value,
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
  const logger = getLogger("GET /api/v1/transactions");

  try {
    const transactions = await db.transaction.findMany({});
    logger.info(`Transactions found: ${transactions.length}`);

    return NextResponse.json(transactions);
  } catch (error) {
    logger.error(error);
    return new NextResponse(INTERNAL_ERROR, { status: 500 });
  }
}
