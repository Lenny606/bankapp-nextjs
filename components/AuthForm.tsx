"use client"

import React, {useState} from 'react'
import Image from "next/image";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import Link from "next/link";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button"
import {CustomInput} from "@/components/CustomInput"
import {
    Form
} from "@/components/ui/form"
import {authFormSchema, getPathLink} from "@/lib/utils";
import {Loader2} from "lucide-react";
import GlobalVariables from "@/app/app.config"
import {useRouter} from "next/navigation";
import {signUp, signIn} from "@/lib/actions/user.actions";
import PlaidLink from "@/components/PlaidLink";

const AuthForm = ({type}: { type: string }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()


    const formSchema = authFormSchema(type)
    // FORM COMPONENT
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address1: "",
            city: "",
            state: "",
            zipCode: "",
            dateOfBirth: "",
            ssn: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            //signup with Appwrite
            const userData = {
                firstName: values.firstName!,
                lastName: values.lastName!,
                address1: values.address1!,
                city: values.city!,
                state: values.state!,
                zipCode: values.zipCode!,
                dateOfBirth: values.dateOfBirth!,
                ssn: values.ssn!,
                email: values.email,
                password: values.password
            }

            if (type === GlobalVariables.PATH_NAME.SIGN_UP) {
                const newUser = await signUp(userData)
                setUser(newUser)
            }

            //sign in
            if (type === GlobalVariables.PATH_NAME.SIGN_IN) {
                const user = await signIn({
                    email: values.email,
                    password: values.password
                } as signInProps)

                if (user) {
                    router.push(getPathLink(GlobalVariables.PATH_NAME.HOMEPAGE))
                }
            }


        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)

        }
    }

    return (
        <section className={'auth-form'}>
            <header className={'flex flex-col gap-5 md:gap-8'}>
                {/*TODO create component for logo */}
                <Link href={'/'}
                      className={'flex cursor-pointer items-center gap-1'}
                >
                    <Image
                        src={'icons/logo.svg'}
                        width={34} height={34}
                        alt={"logo"}
                    />
                    <h1 className={'font-ibm-plex-serif text-26'}>
                        {process.env.NEXT_PUBLIC_APP_NAME}
                    </h1>
                </Link>
                <div className={'flex flex-col gap-1 md:gap-3 '}>
                    <h1 className={'text-24 lg:text-36 font-semibold text-gray-900'}>
                        {user ? "Link account"
                            : type === GlobalVariables.PATH_NAME.SIGN_IN
                                ? GlobalVariables.LABELS.SIGN_IN
                                : GlobalVariables.LABELS.SIGN_UP
                        }
                    </h1>
                    <p className={'text-16 lg:text-26 font-normal text-gray-600'}>
                        {
                            user ? GlobalVariables.LABELS.USER_LINK_ACCOUNT
                                : GlobalVariables.LABELS.USER_ENTER_DETAILS
                        }
                    </p>
                </div>
            </header>
            {/*{*/}
            {/*    user ? (*/}
                    <div className={'flex flex-col gap-4'}>
                        <PlaidLink user={user} variant={'primary'}/>
                    </div>
                {/*// ) : (*/}
                    <>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                {
                                    //     INPUTS ONLY FOR SIGN UP
                                    type === GlobalVariables.PATH_NAME.SIGN_UP && (
                                        <>
                                            <div className={'flex justify-between gap-4 '}>
                                                <CustomInput name={'firstName'} label={'First Name'} placeholder={'John'}
                                                             control={form.control}/>
                                                <CustomInput name={'lastName'} label={'Last Name'} placeholder={'Dow'}
                                                             control={form.control}/>
                                            </div>
                                            <CustomInput name={'address1'} label={'Address'}
                                                         placeholder={'Enter your address'}
                                                         control={form.control}/>
                                            <CustomInput name={'city'} label={'City'}
                                                         placeholder={'Enter your city'}
                                                         control={form.control}/>
                                            <div className={'flex justify-between gap-4'}>
                                                <CustomInput name={'state'} label={'State'} placeholder={'CZ'}
                                                             control={form.control}/>
                                                <CustomInput name={'zipCode'} label={'Zip Code'} placeholder={'11000'}
                                                             control={form.control}/>
                                            </div>
                                            <div className={'flex justify-between gap-4'}>

                                                <CustomInput name={'dateOfBirth'} label={'Birth Date'}
                                                             placeholder={'1.1.2000'}
                                                             control={form.control}/>
                                                <CustomInput name={'ssn'} label={'SSN'} placeholder={'1234'}
                                                             control={form.control}/>
                                            </div>

                                        </>
                                    )

                                }

                                <CustomInput name={'email'} label={"Email"} placeholder={'enter email'}
                                             control={form.control}/>
                                <CustomInput name={'password'} label={"Password"} placeholder={'enter password'}
                                             control={form.control}/>
                                <div className={'flex flex-col gap-4'}>
                                    <Button type="submit" className={'form-btn'} disabled={isLoading}>
                                        {
                                            isLoading ? (
                                                <>
                                                    <Loader2 size={'20'}
                                                             className={'animate-spin'}
                                                    />
                                                    Loading...
                                                </>
                                            ) : type === GlobalVariables.PATH_NAME.SIGN_IN
                                                ? GlobalVariables.LABELS.SIGN_IN
                                                : GlobalVariables.LABELS.SIGN_UP
                                        }
                                    </Button>
                                </div>
                            </form>
                        </Form>
                        <footer className={" flex justify-center gap-1"}>
                            <p className={'text-14 font-normal text-gray-600'}>
                                {
                                    type === GlobalVariables.PATH_NAME.SIGN_IN
                                        ? GlobalVariables.LABELS.USER_DONT_HAVE_ACCOUNT
                                        : GlobalVariables.LABELS.USER_HAS_ACCOUNT
                                }
                            </p>
                            <Link href={
                                type === GlobalVariables.PATH_NAME.SIGN_IN
                                    ? getPathLink(GlobalVariables.PATH_NAME.SIGN_UP)
                                    : getPathLink(GlobalVariables.PATH_NAME.SIGN_IN)
                            }
                                  className={'form-link'}>
                                {
                                    type === GlobalVariables.PATH_NAME.SIGN_IN
                                        ? GlobalVariables.LABELS.SIGN_UP
                                        : GlobalVariables.LABELS.SIGN_IN
                                }
                            </Link>
                        </footer>
                    </>
                {/*// )*/}
            {/*}*/}

        </section>
    )
}
export default AuthForm
