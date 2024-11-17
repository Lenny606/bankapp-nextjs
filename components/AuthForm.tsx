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
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {authFormSchema} from "@/lib/utils";

const AuthForm = ({type}: { type: string }) => {
    const [user, setUser] = useState(null)
    // FORM COMPONENT
    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof authFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
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
                        {user ? "Link ac>count"
                            : type === "sign-in" ? "Sign In" : "Sign Out"}
                    </h1>
                    <p className={'text-16 lg:text-26 font-normal text-gray-600'}>
                        {
                            user ? "Link account to get started"
                                : 'Enter your details'
                        }
                    </p>
                </div>
            </header>
            {
                user ? (
                    <div className={'flex flex-col gap-4'}>
                        {/*{PLAIDLINK}*/}
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/*<FormField*/}
                            {/*    control={form.control}*/}
                            {/*    name="email"*/}
                            {/*    render={({field}) => (*/}
                            {/*        <div className={'form-item'}>*/}
                            {/*            <FormLabel className={'form-label'}>*/}
                            {/*                Email*/}
                            {/*            </FormLabel>*/}
                            {/*            <div className={'flex w-full'}>*/}
                            {/*                <FormControl>*/}
                            {/*                    <Input placeholder={'Email'}*/}
                            {/*                           className={'input-class'}*/}
                            {/*                           {...field}*/}
                            {/*                    />*/}
                            {/*                </FormControl>*/}
                            {/*                <FormMessage className={'form-message'} ></FormMessage>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    )}*/}
                            {/*/>*/}
                            <CustomInput name={'email'} label={"Email"} placeholder={'enter email'} control={form.control} />
                            <CustomInput name={'password'} label={"Password"} placeholder={'enter password'} control={form.control} />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                )
            }
        </section>
    )
}
export default AuthForm
