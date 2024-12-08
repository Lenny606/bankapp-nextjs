'use server'

import {createAdminClient, createSessionClient} from "@/lib/appwrite";
import {ID} from "node-appwrite";
import {cookies} from "next/headers";
import {encryptId, extractCustomerIdFromUrl, parseStringify} from "@/lib/utils";
import {CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products} from "plaid";
import {plaidClient} from "@/lib/plaid";
import {revalidatePath} from "next/cache";
import {addFundingSource, createDwollaCustomer} from "@/lib/actions/dwolla.actions";

export const signIn = async ({email, password}: signInProps) => {
    try {
        const {account} = await createAdminClient();
        const response = await account.createEmailPasswordSession(email, password)

        //pass object to client side
        return parseStringify(response)
    } catch (e) {
        console.error(e)
    }
}

export const signUp = async (userData: SignUpParams) => {

    let newUserAccount;

    try {
        const {email, password, firstName, lastName} = userData
        const name = firstName + ' ' + lastName
        //uses Appwrite code
        const {account, database} = await createAdminClient();

        newUserAccount = await account.create(ID.unique(), email, password, name);

        if (!newUserAccount) {
            throw new Error('Error creating user')
        }
        //create custometr processor
        const dwollaCustomerUrl = await createDwollaCustomer({
            ...userData,
            type: "personal"
        })

        if (!dwollaCustomerUrl) {
            throw new Error('Error creating Dwolla customer')
        }
        const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl)

        const newUser = await database.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DTB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_DTB_BANKS_ID!,
            ID.unique(),
            {
                ...userData,
                userId: newUserAccount.$id,
                dwollaCustomerId,
                dwollaCustomerUrl
            })

        const session = await account.createEmailPasswordSession(email, password);

        //TODO fix sessions
        await cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(newUser)
    } catch (e) {
        console.error(e)
    }
}

export async function getLoggedInUser() {
    try {
        const {account} = await createSessionClient();
        //uses workaround to pass object
        const user = await account.get();
        console.log(user)
        return parseStringify(user)
    } catch (error) {
        console.error(error)
        return null;
    }
}

export async function logout() {
    try {
        const {account} = await createSessionClient();
        (await cookies()).delete('appwrite-session')
        await account.deleteSession('current')
    } catch (error) {
        console.error(error)
        return null;
    }
}

export async function createLinkToken(user: User) {
    try {
        //plaid specific setup
        const tokenParams = {
            user: {
                client_user_id: user.$id
            },
            client_name: user.name,
            products: ['auth'] as Products[],
            language: 'en',
            country_codes: ['US'] as CountryCode[]
        }

        const res = await plaidClient.linkTokenCreate(tokenParams)
        return parseStringify({linkToken: res.data.link_token})
    } catch (error) {
        console.error(error)
    }
}

export async function createBankAccount({
                                            userId,
                                            bankId,
                                            accountId,
                                            accessToken,
                                            fundingSourceUrl,
                                            sharableId
                                        }: createBankAccountProps) {
    try {
        //get appwrite db
        const {database} = await createAdminClient()
        const bankAccount = await database.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DTB_ID!,
            process.env.NEXT_PUBLIC_APPWRITE_DTB_BANKS_ID!,
            ID.unique(),
            {
                userId,
                bankId,
                accountId,
                accessToken,
                fundingSourceUrl,
                sharableId
            })

        return parseStringify(bankAccount)
    } catch (e) {
        console.error(e)
    }

}


export async function exchangePublicToken({user, publicToken}: exchangePublicTokenProps) {
    try {
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken
        })
        const accessToken = response.data.access_token
        const itemId = response.data.item_id

        //info from plaid using token
        const accountResponse = await plaidClient.accountsGet({
            access_token: accessToken
        })

        const accountData = accountResponse.data.accounts[0]

        // procesor token fot Dwolla
        const request: ProcessorTokenCreateRequest = {
            access_token: accessToken,
            account_id: accountData.account_id,
            processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum
        }

        const processorTokenResponse = await plaidClient.processorTokenCreate(request)
        const processorToken = processorTokenResponse.data.processor_token

        const fundingSourceUrl = await addFundingSource({
            dwollaCustomerId: user.dwollaCustomerId,
            processorToken,
            bankName: accountData.name
        })
        if (!fundingSourceUrl) {
            throw Error
        }

        //create bankaccount
        await createBankAccount({
            userId: user.$id,
            bankId: itemId,
            accountId: accountData.account_id,
            accessToken,
            fundingSourceUrl,
            sharableId: encryptId(accountData.account_id)
        })

        //revalidate path to reflect changes
        revalidatePath("/")

        return parseStringify({publicTokenExchange: "complete"})
    } catch (error) {
        console.error(error)
    }
}

