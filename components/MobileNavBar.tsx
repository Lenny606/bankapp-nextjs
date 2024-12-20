"use client"
import {
    Sheet, SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from "next/link";
import {sidebarLinks} from "@/constants";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {Footer} from "@/components/Footer";


export const MobileNavBar = ({user}: MobileNavProps) => {

    //hook used => client side compoenent
    const pathName = usePathname()

    //shadcn component sheet -  npx shadcn-ui@latest add sheet
    return (
        <section className={'w-full max-w-[264px]'}>
            <Sheet>
                <SheetTrigger>
                    <Image src={'/icons/hamburger.svg'} width={30} height={30} alt={'hamburger menu'}
                           className={'cursor-pointer'}/>
                </SheetTrigger>
                <SheetContent side={'left'} className={'bg-white border-none'}>
                    <SheetClose asChild>
                        <nav className={'flex flex-col h-full gap-6 pt-16 text-white'}>
                            {
                                sidebarLinks.map((item) => {

                                        //check if link is active
                                        const isActive = pathName === item.route ||
                                            pathName.startsWith(`${item.route}/`)


                                        return (
                                            <SheetClose asChild key={item.label}>
                                                <Link href={item.route}
                                                    //set class only if link is active
                                                      className={cn('mobilenav-sheet_close w-full', {
                                                          'bg-bank-gradient': isActive
                                                      })}
                                                      key={item.label}>

                                                        <Image src={item.imgURL}
                                                               alt={item.label}
                                                               width={20}
                                                               height={20}
                                                               className={cn({'brightness-[3] invert-0': isActive})}/>

                                                    <p className={cn('text-16 font-semibold text-black-2', {'text-white': isActive})}>
                                                        {item.label}
                                                    </p>
                                                </Link>
                                            </SheetClose>

                                        )
                                    }
                                )
                            }
                            USEr
                        </nav>
                    </SheetClose>
                    <Footer user={user} type={'mobile'}/>
                    <Link href={'/'}
                          className={'flex cursor-pointer items-center gap-1 px-4'}
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

                </SheetContent>
            </Sheet>

        </section>
    )
}