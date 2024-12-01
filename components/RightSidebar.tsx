
import Link from "next/link";
import Image from "next/image";
import {sidebarLinks} from '@/constants/index.ts';
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {BankCard} from "@/components/BankCard";

export const RightSidebar = ({user, transactions, banks}: RightSidebarProps) => {


    return (
        <aside className={'right-sidebar'}>
            <section className={'flex flex-col pb-8'}>
                <div className={'profile-banner'}>
                    <div className={'profile'}>
                        <div className={'profile-img'}>
                            <span className={'font-bold text-5xl text-blue-500'}>{user.name} </span>
                        </div>
                        <div className={'profile-details'}>
                            <h1 className={'profile-name'}>
                                {user.name}
                            </h1>
                            <p className={'profile-email'}> {user.email} </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={'banks'}>
                <div className={'w-full flex justify-between'}>

                    <h2 className={'header-2'}>
                        My Banks
                    </h2>
                    <Link href={'/'} className={'flex gap-2'}>
                        <Image src={'/icons/plus.svg'} width={20} height={20} alt='plus'/>
                        <h2 className={'text-14 text-gray-600 font-semibold'}>
                            Add bank
                        </h2>
                    </Link>
                </div>
                {
                    banks?.length > 0 && (
                        <div className={'relative flex flex-col flex-1 items-center justify-center gap-5 '}>
                            <div className={'relative z-10'}>
                                <BankCard
                                key={banks[0].id}
                                account={banks[0]}
                                userName={user.name}
                                showBalance={false}
                                />
                            </div>
                            {
                                // if there are more than 2 banks
                                banks[1] && (
                                    <div className={'absolute right-0 top-8 z-0 w-[90%]'}>
                                        <BankCard
                                            key={banks[1].id}
                                            account={banks[1]}
                                            userName={user.name}
                                            showBalance={false}
                                        />
                                    </div>
                                )
                            }
                        </div>

                    )
                }
            </section>
        </aside>
    )
}