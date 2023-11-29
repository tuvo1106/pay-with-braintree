"use client";

import { useEffect, useState } from "react";

import { CreateCustomerModal } from "@/components/modal/create-customer-modal";
import { CreateNonceModal } from "@/components/modal/create-nonce-modal";
import { VaultPaymentMethodModal } from "@/components/modal/vault-payment-method-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <CreateNonceModal />
            <CreateCustomerModal />
            <VaultPaymentMethodModal />
        </>
    );
};
