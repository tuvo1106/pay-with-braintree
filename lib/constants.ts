export const ACH_MANDATE_TEXT =
    'By clicking ["Checkout"], I authorize Braintree, a service of PayPal, on behalf of [your business name here] (i) to verify my bank account information using bank information and consumer reports and (ii) to debit my bank account.'
export const US_BANK_ACCOUNT = "US_BANK_ACCOUNT"
export const VENMO_ACCOUNT = "VENMO_ACCOUNT"
export const INVALID_PARAMS = "Invalid params"
export const INTERNAL_ERROR = "Internal error"
export const UNKNOWN = "UNKNOWN"

export function getPaymentInstrument(str: string) {
    switch (str) {
        case "VenmoAccount":
            return VENMO_ACCOUNT
        case "us_bank_account":
            return US_BANK_ACCOUNT
        default:
            return UNKNOWN
    }
}
