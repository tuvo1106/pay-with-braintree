"use client";

import { Heading } from "@/components/heading";
import axios from "axios";

const CustomerPage = () => {
    const createCustomer = async () => {
        try {
            const payload = {
                firstName: "Gary",
                lastName: "Planton",
                company: "Banksy Trading Co",
                email: "banksytradingco@gmail.com",
                phone: "5555555555",
            };
            const res = await axios.post("/api/v1/customers", payload);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Heading title="Customers" description="lorem ipsum" />
            <div className="px-4 lg:px-8">
                <button onClick={createCustomer}>CREATE CUSTOMER</button>
            </div>
        </div>
    );
};

export default CustomerPage;
