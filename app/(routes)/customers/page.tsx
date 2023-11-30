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
    const [customers, setCustomers] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            const res = await fetcher("/api/v1/customers");
            setCustomers(res);
        };
        fetchCustomers();
    }, [setCustomers]);

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
                    data={transformData(customers)}
                ></DataTable>
            </div>
        </div>
    );
};

const transformData = (customers: PrismaCustomer[] | null) => {
    if (!customers) {
        return [];
    }

    return customers.map((customer) => ({
        name: `${customer.firstName} ${customer.lastName}`,
        company: customer.company,
        email: customer.email,
        phone: customer.phone,
        braintreePublicId: customer.braintreePublicId,
        createdAt: new Date(customer.createdAt).toDateString(),
    }));
};

export default CustomerPage;
