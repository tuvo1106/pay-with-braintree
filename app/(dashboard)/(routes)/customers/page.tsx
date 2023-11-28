"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import axios from "axios";
import { columns } from "./columns";
import { useModal } from "@/hooks/use-modal-store";

const fakeData = [
    {
        name: "Tu Vo",
        company: "PayPal",
        email: "test@paypal.com",
        phone: "55555555555",
        braintreePublicId: "abc123",
        createdAt: new Date().toDateString(),
    },
];

const CustomerPage = () => {
    const { onOpen } = useModal();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/v1/nonces");
            const newData = await response.json();
            setData(null);
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
                    data={data || fakeData}
                ></DataTable>
            </div>
        </div>
    );
};

export default CustomerPage;
