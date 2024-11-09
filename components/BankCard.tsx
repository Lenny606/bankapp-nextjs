import Link from "next/link";
import {formatAmount} from "@/lib/utils";
import Image from "next/image";

export const BankCard = ({key, account, username, showBalance}: CreditCardProps) => {


    return (
        <div>
            <Link href={`/`} className={'bank-card'}>
                <div className={'bank-card_content'}>
                    <div>
                        <h1 className={'font-semibold text-white text-16'}>
                            {account.name || username}
                        </h1>
                        <p className={'font-ibm-plex-serif font-black text-white'}>
                            {formatAmount(account.currentBalance)}
                        </p>
                    </div>
                    <article className={'flex flex-col gap-2'}>
                        <div className={'flex justify-between'}>
                            <h1 className={'font-semibold text-white text-12'}>
                                {username}
                            </h1>
                            <h2 className={'font-semibold text-white text-12'}>
                                ●● / ●●
                            </h2>
                        </div>
                        <p className={'text-14 font-semibold text-white tracking-[1.1px]'}>
                            ●●●● ●●●● ●●●● <span className={'text-14'}>1245</span>
                        </p>
                    </article>
                </div>

                <div className={'bank-card_icon'}>
                    <Image src={'/icons/Paypass.svg'} alt={'pay'} width={20} height={24} />
                    <Image src={'/icons/mastercard.svg'} alt={'mastercard'} width={45} height={32} className={'ml-5'}/>
                    <Image src={'/icons/lines.png'} alt={'lines'} width={316} height={190} className={'absolute top-0 left-0'}/>
                </div>
            </Link>
        {/*    TODO copy feature*/}
        </div>
    )
}