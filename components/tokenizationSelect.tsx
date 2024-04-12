"use client"

import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/use-modal-store"
import { getBraintreeClient, getVenmoInstance } from "@/lib/braintree"
import axios from "axios"

export const TokenizationSelect = () => {
    const { onOpen } = useModal()

    const tokenizationKey =
        process.env.NEXT_PUBLIC_BRAINTREE_SDK_TOKENIZATION_KEY
    if (!tokenizationKey) {
        return null
    }

    return (
        <>
            <div className="px-4 lg:px-8">
                <Button onClick={() => onOpen("createAchNonce")}>
                    Tokenize an ACH nonce
                </Button>
            </div>
            <div className="px-4 lg:px-8 py-4">
                <Button onClick={() => onOpen("createLpmNonce")}>
                    Tokenize an LPM nonce
                </Button>
            </div>
            <div className="px-4 lg:px-8">
                <Button onClick={() => venmoOnClickHander(tokenizationKey)}>
                    Tokenize an Venmo nonce
                </Button>
            </div>
        </>
    )
}

const venmoOnClickHander = async (tokenizationKey: string) => {
    const client = await getBraintreeClient(tokenizationKey)
    if (!client) {
        return null
    }

    const venmoInstance = await getVenmoInstance(client)
    if (!venmoInstance) {
        return null
    }

    if (!venmoInstance.isBrowserSupported()) {
        return null
    }

    try {
        const tokenizePayload = await venmoInstance.tokenize()
        console.log(tokenizePayload)
        await axios.post("/api/v1/nonces", tokenizePayload)
    } catch (error) {
        console.log(error)
    }
}
export default TokenizationSelect
