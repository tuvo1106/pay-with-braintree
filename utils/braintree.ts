import braintree from "braintree-web";

export const getBraintreeClient = async (tokenizationKey: string) => {
    try {
        return await braintree.client.create({
            authorization: tokenizationKey,
        });
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getUsBankAccountInstance = async (client: braintree.Client) => {
    try {
        return await braintree.usBankAccount.create({ client: client });
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getLocalPaymentsInstance = async (client: braintree.Client) => {
    try {
        return await braintree.localPayment.create({ client: client });
    } catch (error) {
        console.log(error);
        return null;
    }
};
