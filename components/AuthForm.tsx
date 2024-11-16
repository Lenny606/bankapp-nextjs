"use client"
import React, {useState} from 'react'
import Image from "next/image";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import Link from "next/link";

const AuthForm = ({type}: { type: string }) => {
    const [user, setUser] = useState(null)
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
                    <>
                    FORM
                    </>
                )
            }
        </section>
    )
}
export default AuthForm
