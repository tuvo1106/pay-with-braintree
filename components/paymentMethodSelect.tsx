"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const PaymentMethodSelect = () => {
    const { onOpen } = useModal();

    return (
        <>
            <div className="px-4 lg:px-8">
                <Button onClick={() => onOpen("vaultAchPaymentMethod")}>
                    Vault an ACH payment method
                </Button>
            </div>
        </>
    );
};

export default PaymentMethodSelect;
