import { ColumnDef } from "@tanstack/react-table";

export type CustomerRow = {
    name: string;
    company: string;
    email: string;
    phone: string;
    braintreePublicId: string;
    createdAt: string;
};

export const columns: ColumnDef<CustomerRow>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "company",
        header: "Company",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
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
