'use server'

import {createAdminClient, createSessionClient} from "@/lib/appwrite";
import {ID} from "node-appwrite";
import {cookies} from "next/headers";
import {parseStringify} from "@/lib/utils";

export const signIn = async ({email, password} : signInProps) => {
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
    try {
        const {email, password, firstName, lastName} = userData
        const name = firstName + ' ' + lastName
        //uses Appwrite code
        const {account} = await createAdminClient();

        const newUserAccount = await account.create(ID.unique(), email, password, name);
        const session = await account.createEmailPasswordSession(email, password);

        //TODO fix sessions
         await cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return parseStringify(newUserAccount)
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

