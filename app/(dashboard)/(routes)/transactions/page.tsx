"use client";

import { Heading } from "@/components/heading";
import axios from "axios";

const TransactionsPage = () => {
    const createSale = async () => {
        try {
            const payload = {
                amount: "10.00",
                paymentMethodToken: "",
            };
            const res = await axios.post("/api/v1/transactions", payload);
            console.log(JSON.stringify(res.data));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Heading title="Payment Methods" description="lorem ipsum" />
            <div className="px-4 lg:px-8">
                <button onClick={createSale}>SALE</button>
            </div>
        </div>
    );
};

export default TransactionsPage;
