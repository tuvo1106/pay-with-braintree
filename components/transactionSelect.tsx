"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const TransactionSelect = () => {
    const { onOpen } = useModal();

    return (
        <>
            <div className="px-4 lg:px-8">
                <Button onClick={() => onOpen("createTransaction")}>
                    Create a transaction
                </Button>
            </div>
        </>
    );
};

export default TransactionSelect;
