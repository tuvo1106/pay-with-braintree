"use client";

import {
    getBraintreeClient,
    getLocalPaymentsInstance,
} from "@/utils/braintree";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import { useModal } from "@/hooks/use-modal-store";

const NoncesPage = () => {
    const { onOpen } = useModal();

    const onClickForLocal = async () => {
        const tokenizationKey =
            process.env.NEXT_PUBLIC_BRAINTREE_SDK_TOKENIZATION_KEY;
        if (!tokenizationKey) {
            return <div className="">Error</div>;
        }
        const client = await getBraintreeClient(tokenizationKey);
        if (!client) return;
        const localPaymentInstance = await getLocalPaymentsInstance(client);
        if (!localPaymentInstance) {
            console.log("Instance unavailable");
            return;
        }

        try {
            const res = await localPaymentInstance.startPayment({
                paymentType: "ideal",
                amount: "10.67",
                fallback: {
                    // see Fallback section for details on these params
                    url: "https://your-domain.com/page-to-complete-checkout",
                    buttonText: "Complete Payment",
                },
                currencyCode: "EUR",
                givenName: "Joe",
                surname: "Doe",
                address: {
                    countryCode: "NL",
                },
                onPaymentStart(data, callback) {
                    console.log(data);
                    callback();
                },
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Heading title="Nonces" description="lorem ipsum" />
            <div className="px-4 lg:px-8">
                <Button onClick={() => onOpen("createNonce")}>
                    Tokenize a nonce
                </Button>
            </div>
            {/* <div className="">
                <Button onClick={onClickForLocal}>LOCAL PAYMENTS</Button>
            </div> */}
        </div>
    );
};

export default NoncesPage;
