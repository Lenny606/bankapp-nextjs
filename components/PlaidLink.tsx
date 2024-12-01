import React, {useCallback, useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from "react-plaid-link";
import {useRouter} from "next/navigation";

const PlaidLink = ({user, variant}: PlaidLinkProps) => {

    const [token, setToken] = useState("")
    const router = useRouter()
//config object
    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkTonken(user) //server action
            setToken(data?.linkToken)
        }
        getLinkToken()
    }, [user]);

    const onSuccess = useCallback<PlaidLinkOnSuccess>(
        async (public_token: string) => {
            await exchangePublicToken({
                publicToken,
                user
            })
            router.push('/')
        }, [user]
    )

    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }

    //PLAID HOOK
    const  {open, ready} = usePlaidLink(config)

    return (
        <>
            {
                variant === 'primary' ? (
                    <Button
                        onClick={() => open}
                        disabled={!ready}
                        className={'plaidlink-primary'}>Connect bank</Button>
                ) : (variant === "ghost" ? (
                        <Button
                            className={'plaidlink-ghost'}>Connect bank</Button>
                    ) : (
                        <Button
                            className={'plaidlink-default'}>Connect bank</Button>
                    )

                )
            }
        </>
    );
};

export default PlaidLink;