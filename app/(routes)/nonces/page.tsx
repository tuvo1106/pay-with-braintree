"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Nonce as PrismaNonce } from "@prisma/client";
import { columns } from "./columns";
import fetcher from "@/lib/fetcher";
import { useModal } from "@/hooks/use-modal-store";
import useSWR from "swr";
import { getBraintreeClient, getVenmoInstance } from "@/lib/braintree";
import axios from "axios";

const NoncesPage = () => {
    const { onOpen } = useModal();
    const { data, isLoading } = useSWR<PrismaNonce[]>(
        "/api/v1/nonces",
        fetcher
    );

    const tokenizationKey =
        process.env.NEXT_PUBLIC_BRAINTREE_SDK_TOKENIZATION_KEY;
    if (!tokenizationKey) {
        return null;
    }

    return (
        <div>
            <Heading title="Nonces" description="lorem ipsum" />
            <div className="px-4 lg:px-8">
                <Button onClick={() => onOpen("createAchNonce")}>
                    Tokenize an ACH nonce
                </Button>
            </div>
            <div className="px-4 lg:px-8 py-4">
                <Button onClick={() => onOpen("createLpmNonce")}>
                    Tokenize an LPM nonce
                </Button>
            </div>
            <div className="px-4 lg:px-8">
                <Button onClick={() => venmoOnClickHander(tokenizationKey)}>
                    Tokenize an Venmo nonce
                </Button>
            </div>
            {!isLoading && (
                <div className="px-4 lg:px-8 py-8">
                    <DataTable
                        columns={columns}
                        data={transformData(data)}
                    ></DataTable>
                </div>
            )}
        </div>
    );
};

const venmoOnClickHander = async (tokenizationKey: string) => {
    const client = await getBraintreeClient(tokenizationKey);
    if (!client) {
        return null;
    }

    const venmoInstance = await getVenmoInstance(client);
    if (!venmoInstance) {
        return null;
    }

    if (!venmoInstance.isBrowserSupported()) {
        return null;
    }

    try {
        const tokenizePayload = await venmoInstance.tokenize();
        console.log(tokenizePayload);
        await axios.post("/api/v1/nonces", tokenizePayload);
    } catch (error) {
        console.log(error);
    }
};

const transformData = (nonces: PrismaNonce[] | undefined) => {
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
