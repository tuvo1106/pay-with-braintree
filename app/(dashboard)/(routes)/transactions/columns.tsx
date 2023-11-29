import { ColumnDef } from "@tanstack/react-table";

export type TransactionRow = {
    amount: string;
    braintreePublicId: string;
    createdAt: string;
};

export const columns: ColumnDef<TransactionRow>[] = [
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        accessorKey: "braintreePublicId",
        header: "BT Public ID",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
];
