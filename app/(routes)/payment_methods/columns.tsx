import { ColumnDef } from "@tanstack/react-table";

export type PaymentMethodRow = {
    braintreePublicId: string;
    verified: boolean;
    status: string;
    createdAt: string;
};

export const columns: ColumnDef<PaymentMethodRow>[] = [
    {
        accessorKey: "braintreePublicId",
        header: "BT Public ID",
    },
    {
        accessorKey: "verified",
        header: "Verified",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
];
