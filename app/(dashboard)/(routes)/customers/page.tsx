"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Customer as PrismaCustomer } from "@prisma/client";
import { columns } from "./columns";
import { fetcher } from "@/lib/fetcher";
import { useModal } from "@/hooks/use-modal-store";

const CustomerPage = () => {
    const { onOpen } = useModal();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetcher("/api/v1/customers");
            setData(res);
        };
        fetchData();
    }, [setData]);

    return (
        <div>
            <Heading title="Customers" description="lorem ipsum" />
            <div className="px-4 lg:px-8">
                <Button onClick={() => onOpen("createCustomer")}>
                    Create a customer
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

const transformData = (data: PrismaCustomer[] | null) => {
    if (!data) {
        return [];
    }

    return data.map((d) => ({
        name: `${d.firstName} ${d.lastName}`,
        company: d.company,
        email: d.email,
        phone: d.phone,
        braintreePublicId: d.braintreePublicId,
        createdAt: new Date(d.createdAt).toDateString(),
    }));
};

export default CustomerPage;
