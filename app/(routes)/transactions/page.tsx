import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Transaction as PrismaTransaction } from "@prisma/client";
import { columns } from "./columns";
import currency from "currency.js";
import { db } from "@/lib/db";
import TransactionSelect from "@/components/transactionSelect";

const TransactionsPage = async () => {
    const data = await db.transaction.findMany({});

    return (
        <div>
            <Heading title="Transactions" description="Create a transaction" />
            <TransactionSelect />
            <div className="px-4 lg:px-8 py-8">
                <DataTable
                    columns={columns}
                    data={transformData(data)}
                ></DataTable>
            </div>
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
