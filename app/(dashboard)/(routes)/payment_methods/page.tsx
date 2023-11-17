"use client";

import { Heading } from "@/components/heading";
import axios from "axios";

const PaymentMethodsPage = () => {
    const vault = async () => {
        try {
            const payload = {
                nonce: "tokenusbankacct_bf_jtxgh9_nhb67d_ypv94c_r48dqh_vtz",
            };
            const res = await axios.post("/api/v1/payment_methods", payload);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Heading title="Payment Methods" description="lorem ipsum" />
            <div className="px-4 lg:px-8">
                <button onClick={vault}>VAULT</button>
            </div>
        </div>
    );
};

export default PaymentMethodsPage;
