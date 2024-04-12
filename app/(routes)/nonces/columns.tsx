import { ColumnDef } from "@tanstack/react-table"

export type NonceRow = {
    token: string
    paymentInstrumentType: string
    createdAt: string
    expiredAt: string
}

export const columns: ColumnDef<NonceRow>[] = [
    {
        accessorKey: "token",
        header: "Token",
    },
    {
        accessorKey: "paymentInstrumentType",
        header: "Payment Instrument Type",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
    {
        accessorKey: "expiredAt",
        header: "Expired At",
    },
]
