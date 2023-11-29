"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Transaction as PrismaTransaction } from "@prisma/client";
import { columns } from "./columns";
import currency from "currency.js";
import { fetcher } from "@/lib/fetcher";
import { useModal } from "@/hooks/use-modal-store";

const TransactionsPage = () => {
    const { onOpen } = useModal();

    const [transactions, setTransactions] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            const res = await fetcher("/api/v1/transactions");
            setTransactions(res);
        };
        fetchTransactions();
    }, [setTransactions]);

    return (
        <div>
            <Heading title="Transactions" description="lorem ipsum" />
            <div className="px-4 lg:px-8">
                <Button onClick={() => onOpen("createTransaction")}>
                    Create a transaction
                </Button>
            </div>
            <div className="px-4 lg:px-8 py-8">
                <DataTable
                    columns={columns}
                    data={transformData(transactions)}
                ></DataTable>
            </div>
            <p>}</p>
        </div>
    );
};

const transformData = (transactions: PrismaTransaction[] | null) => {
    console.log(transactions)
    if (!transactions) {
        return [];
    }

    return transactions.map((transaction) => ({
        amount: currency(transaction.amount).toString(),
        braintreePublicId: transaction.braintreePublicId,
        createdAt: new Date(transaction.createdAt).toDateString(),
    }));
};

export default TransactionsPage;
