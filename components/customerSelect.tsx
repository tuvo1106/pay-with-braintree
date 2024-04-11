"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const CustomerSelect = () => {
    const { onOpen } = useModal();

    return (
        <>
            <div className="px-4 lg:px-8">
                <Button onClick={() => onOpen("createCustomer")}>
                    Create a customer
                </Button>
            </div>
        </>
    );
};

export default CustomerSelect;
