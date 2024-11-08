"use client"
import Link from "next/link";
import Image from "next/image";
import {sidebarLinks} from '@/constants/index.ts';
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

export const Sidebar = ({user}: SiderbarProps) => {

    //hook used => client side compoenent
    const pathName = usePathname()

    return (
        <section className={'sidebar w-full'}>
            <nav className={"flex flex-col gap-4"}>
                <Link href={'/'}
                      className={'flex cursor-pointer items-center gap-2 mb-12'}
                >
                    <Image
                        src={'icons/logo.svg'}
                        width={34} height={34}
                        alt={"logo"}
                        className={'size-[24px] max-xl:size-14'}/>
                    <h1 className={'sidebar-logo'}>
                        My Bank
                    </h1>
                </Link>
                {
                    sidebarLinks.map((item) => {

                            //check if link is active
                            const isActive = pathName === item.route ||
                                pathName.startsWith(`${item.route}/`)


                            return (
                                <Link href={item.route}
                                    //set class only if link is active
                                      className={cn('sidebar-link', {
                                          'bg-bank-gradient': isActive
                                      })}
                                      key={item.label}>
                                    <div className={'relative size-6'}>
                                        <Image src={item.imgURL}
                                               alt={item.label}
                                               fill
                                               className={cn({'brightness-[3] invert-0': isActive})}/>
                                    </div>
                                    <p className={cn('sidebar-label', {'!text-white': isActive})}>
                                        {item.label}
                                    </p>
                                </Link>
                            )
                        }
                    )
                }
                USER
            </nav>
            FOOTER
        </section>
    )
}