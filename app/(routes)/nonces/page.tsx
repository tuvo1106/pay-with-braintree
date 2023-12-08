"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Nonce as PrismaNonce } from "@prisma/client";
import { columns } from "./columns";
import { fetcher } from "@/lib/fetcher";
import { useModal } from "@/hooks/use-modal-store";

const NoncesPage = () => {
    const { onOpen } = useModal();
    const [nonces, setNonces] = useState(null);

    useEffect(() => {
        const fetchNonces = async () => {
            const res = await fetcher("/api/v1/nonces");
            setNonces(res);
        };
        fetchNonces();
    }, [setNonces]);

    return (
        <div>
            <Heading title="Nonces" description="lorem ipsum" />
            <div className="px-4 lg:px-8 py-4">
                <Button onClick={() => onOpen("createAchNonce")}>
                    Tokenize an ACH nonce
                </Button>
            </div>
            <div className="px-4 lg:px-8">
                <Button onClick={() => onOpen("createLpmNonce")}>
                    Tokenize an LPM nonce
                </Button>
            </div>
            <div className="px-4 lg:px-8 py-8">
                <DataTable
                    columns={columns}
                    data={transformData(nonces)}
                ></DataTable>
            </div>
        </div>
    );
};

const transformData = (nonces: PrismaNonce[] | null) => {
    if (!nonces) {
        return [];
    }

    return nonces.map((nonce) => ({
        token: nonce.token,
        paymentInstrumentType: nonce.paymentInstrumentType,
        createdAt: new Date(nonce.createdAt).toTimeString(),
        expiredAt: getNonceExpirationTime(
            new Date(nonce.createdAt)
        ).toTimeString(),
    }));
};

const getNonceExpirationTime = (date: Date) => {
    const currentTime = date.getTime();
    return new Date(currentTime + 3 * 60 * 60 * 1000);
};

export default NoncesPage;
