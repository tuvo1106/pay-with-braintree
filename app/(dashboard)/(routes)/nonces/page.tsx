"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Nonce as PrismaNonce } from "@prisma/client";
import { columns } from "./columns";
import { useModal } from "@/hooks/use-modal-store";

const NoncesPage = () => {
    const { onOpen } = useModal();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/v1/nonces");
            const newData = await response.json();
            setData(newData);
        };
        fetchData();
    }, [setData]);

    return (
        <div>
            <Heading title="Nonces" description="lorem ipsum" />
            <div className="px-4 lg:px-8">
                <Button onClick={() => onOpen("createNonce")}>
                    Tokenize a nonce
                </Button>
            </div>
            <div className="px-4 lg:px-8 py-8">
                <DataTable
                    columns={columns}
                    data={transformData(data)}
                ></DataTable>
            </div>
        </div>
    );
};

const transformData = (data: PrismaNonce[] | null) => {
    if (!data) {
        return [];
    }
    
    return data.map((d) => ({
        token: d.token,
        paymentInstrumentType: d.paymentInstrumentType,
        createdAt: new Date(d.createdAt).toTimeString(),
        expiredAt: getNonceExpirationTime(new Date(d.createdAt)).toTimeString(),
    }));
};

const getNonceExpirationTime = (d: Date) => {
    const currentTime = d.getTime();
    return new Date(currentTime + 3 * 60 * 60 * 1000);
};

export default NoncesPage;
