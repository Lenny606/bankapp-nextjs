'use client'
import Image from 'next/image'
import {logout} from "@/lib/actions/user.actions";
import {useRouter} from "next/navigation";

export const Footer = ({user, type = 'desktop'}: FooterProps) => {

    const router = useRouter()
    const handleLogout = async () => {

        const result = await logout()
        if (result) {
            router.push('/login')
        }
    }

    return (
        <footer className={'footer'}>
            <div className={type === "desktop" ? 'footer_name' : 'footer_name-mobile'}>
                <p className={'text-xl font-bold text-gray-700'}>
                    {
                        user.name[0]
                    }
                </p>
            </div>
            <div className={type === "desktop" ? 'footer_email' : 'footer_email-mobile'}>
                <p className={'text-14 font-semibold text-gray-700 truncate'}>
                    {
                        user.name
                    }
                </p>
                <p className={'text-14 font-normal text-gray-600 truncate'}>
                    {
                        user.email
                    }
                </p>
            </div>
            <div className={'footer_image'} onClick={handleLogout}>
                <Image src={'icons/logout.svg'} fill alt={'logout'}/>
            </div>
        </footer>
    )
}