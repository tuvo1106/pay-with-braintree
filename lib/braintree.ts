import braintree from "braintree-web"

export const getBraintreeClient = async (tokenizationKey: string) => {
    try {
        return await braintree.client.create({
            authorization: tokenizationKey,
        })
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getUsBankAccountInstance = async (client: braintree.Client) => {
    try {
        return await braintree.usBankAccount.create({ client: client })
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getLocalPaymentInstance = async (client: braintree.Client) => {
    try {
        return await braintree.localPayment.create({ client: client })
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getVenmoInstance = async (client: braintree.Client) => {
    try {
        return braintree.venmo.create({
            client: client,
            allowDesktop: true,
            mobileWebFallBack: true,
            allowDesktopWebLogin: true,
            paymentMethodUsage: "multi_use",
        })
    } catch (error) {
        console.log(error)
        return null
    }
}
