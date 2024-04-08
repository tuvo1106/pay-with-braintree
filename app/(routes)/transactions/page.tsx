"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Transaction as PrismaTransaction } from "@prisma/client";
import { columns } from "./columns";
import currency from "currency.js";
import fetcher from "@/lib/fetcher";
import { useModal } from "@/hooks/use-modal-store";
import useSWR from "swr";

const TransactionsPage = () => {
    const { onOpen } = useModal();
    const { data, isLoading } = useSWR<PrismaTransaction[]>(
        "/api/v1/transactions",
        fetcher
    );
    return (
        <div>
            <Heading title="Transactions" description="lorem ipsum" />
            <div className="px-4 lg:px-8">
                <Button onClick={() => onOpen("createTransaction")}>
                    Create a transaction
                </Button>
            </div>
            {!isLoading && (
                <div className="px-4 lg:px-8 py-8">
                    <DataTable
                        columns={columns}
                        data={transformData(data)}
                    ></DataTable>
                </div>
            )}
        </div>
    );
};

const transformData = (transactions: PrismaTransaction[] | undefined) => {
    if (!transactions) {
        return [];
    }

    return transactions.map((transaction) => ({
        amount: currency(transaction.amount).toString(),
        braintreePublicId: transaction.braintreePublicId,
        paymentInstrument: transaction.paymentInstrument,
        createdAt: new Date(transaction.createdAt).toDateString(),
    }));
};

export default TransactionsPage;
