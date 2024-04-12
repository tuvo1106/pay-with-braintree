import { ColumnDef } from "@tanstack/react-table"

export type PaymentMethodRow = {
    braintreePublicId: string
    paymentInstrument: string
    verified: boolean | null
    status: string | null
    createdAt: string
}

export const columns: ColumnDef<PaymentMethodRow>[] = [
    {
        accessorKey: "braintreePublicId",
        header: "BT Public ID",
    },
    {
        accessorKey: "paymentInstrument",
        header: "Payment Instrument",
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
]
