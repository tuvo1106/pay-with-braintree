"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { PaymentMethod as PrismaPaymentMethod } from "@prisma/client";
import { columns } from "./columns";
import { fetcher } from "@/lib/fetcher";
import { useModal } from "@/hooks/use-modal-store";

const PaymentMethodsPage = () => {
    const { onOpen } = useModal();
    const [paymentMethods, setPaymentMethods] = useState(null);

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            const res = await fetcher("/api/v1/payment_methods");
            setPaymentMethods(res);
        };
        fetchPaymentMethods();
    }, [setPaymentMethods]);

    return (
        <div>
            <Heading title="Payment Methods" description="lorem ipsum" />
            <div className="px-4 lg:px-8">
                <Button onClick={() => onOpen("vaultPaymentMethod")}>
                    Vault a payment method
                </Button>
            </div>
            <div className="px-4 lg:px-8 py-8">
                <DataTable
                    columns={columns}
                    data={transformData(paymentMethods)}
                ></DataTable>
            </div>
        </div>
    );
};

const transformData = (paymentMethods: PrismaPaymentMethod[] | null) => {
    if (!paymentMethods) {
        return [];
    }

    return paymentMethods.map((paymentMethod) => ({
        braintreePublicId: paymentMethod.braintreePublicId,
        verified: paymentMethod.verified,
        status: paymentMethod.status,
        createdAt: new Date(paymentMethod.createdAt).toDateString(),
    }));
};

export default PaymentMethodsPage;
