"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { PaymentMethod as PrismaPaymentMethod } from "@prisma/client";
import { columns } from "./columns";
import fetcher from "@/lib/fetcher";
import { useModal } from "@/hooks/use-modal-store";
import useSWR from "swr";

const PaymentMethodsPage = () => {
    const { onOpen } = useModal();
    const { data, isLoading } = useSWR<PrismaPaymentMethod[]>(
        "/api/v1/payment_methods",
        fetcher
    );

    return (
        <div>
            <Heading
                title="Payment Methods"
                description="Vault a payment method"
            />
            <div className="px-4 lg:px-8">
                <Button onClick={() => onOpen("vaultAchPaymentMethod")}>
                    Vault an ACH payment method
                </Button>
            </div>
            <div className="px-4 lg:px-8 py-4">
                <Button onClick={() => onOpen("vaultVenmoPaymentMethod")}>
                    Vault a Venmo payment method
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

const transformData = (paymentMethods: PrismaPaymentMethod[] | undefined) => {
    if (!paymentMethods) {
        return [];
    }

    return paymentMethods.map((paymentMethod) => ({
        braintreePublicId: paymentMethod.braintreePublicId,
        paymentInstrument: paymentMethod.paymentInstrument,
        verified: paymentMethod.verified,
        status: paymentMethod.status,
        createdAt: new Date(paymentMethod.createdAt).toDateString(),
    }));
};

export default PaymentMethodsPage;
