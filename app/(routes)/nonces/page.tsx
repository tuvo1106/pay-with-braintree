import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Nonce as PrismaNonce } from "@prisma/client";
import { columns } from "./columns";
import { db } from "@/lib/db";
import TokenizationSelect from "@/components/tokenizationSelect";

const NoncesPage = async () => {
    const data = await db.nonce.findMany({});

    return (
        <div>
            <Heading title="Nonces" description="Tokenize a nonce" />
            <TokenizationSelect />
            <div className="px-4 lg:px-8 py-8">
                <DataTable
                    columns={columns}
                    data={transformData(data)}
                ></DataTable>
            </div>
        </div>
    );
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
