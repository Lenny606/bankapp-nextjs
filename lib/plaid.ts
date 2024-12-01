import {Configuration, PlaidApi, PlaidEnvironments} from "plaid";

const plaidConfig = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.NEXT_PLAID_CLIENT_ID,
            'PLAID-SECRET' : process.env.NEXT_PLAID_SECRET
        }
    }
})

export const plaidClient = new PlaidApi(plaidConfig)