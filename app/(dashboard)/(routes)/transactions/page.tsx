"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";

const TransactionsPage = () => {
    const { onOpen } = useModal();
    const createSale = async () => {
        try {
            const payload = {
                amount: "10.00",
                paymentMethodToken: "",
            };
            const res = await axios.post("/api/v1/transactions", payload);
            console.log(JSON.stringify(res.data));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Heading title="Transactions" description="lorem ipsum" />
            <div className="px-4 lg:px-8">
                <Button onClick={() => onOpen("vaultPaymentMethod")}>
                    Create a transaction
                </Button>
            </div>
        </div>
    );
};

export default TransactionsPage;
