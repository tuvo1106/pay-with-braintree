"use client";

import { useEffect, useState } from "react";

import { CreateAchNonceModal } from "@/components/modal/create-ach-nonce-modal";
import { CreateCustomerModal } from "@/components/modal/create-customer-modal";
import { CreateLpmNonceModal } from "@/components/modal/create-lpm-nonce-modal";
import { CreateTransactionModal } from "@/components/modal/create-transaction-modal";
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
            <CreateAchNonceModal />
            <CreateLpmNonceModal />
            <CreateCustomerModal />
            <VaultPaymentMethodModal />
            <CreateTransactionModal />
        </>
    );
};
