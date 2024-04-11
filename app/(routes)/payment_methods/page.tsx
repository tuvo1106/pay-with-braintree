import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { PaymentMethod as PrismaPaymentMethod } from "@prisma/client";
import { columns } from "./columns";
import { db } from "@/lib/db";
import PaymentMethodSelect from "@/components/paymentMethodSelect";

const PaymentMethodsPage = async () => {
    const data = await db.paymentMethod.findMany({});

    return (
        <div>
            <Heading
                title="Payment Methods"
                description="Vault a payment method"
            />
            <PaymentMethodSelect />

            <div className="px-4 lg:px-8 py-8">
                <DataTable
                    columns={columns}
                    data={transformData(data)}
                ></DataTable>
            </div>
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
