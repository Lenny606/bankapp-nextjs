import {formatAmount} from "@/lib/utils";
import {AnimatedCounter} from "@/components/AnimatedCounter";

export const TotalBalanceBox = ({accounts = [], totalBanks, totalCurrentBalance}: TotlaBalanceBoxProps) => {
    return (
        <section className={'total-balance'}>
            <div className={'total-balance-chart'}>
            {/*CHARt*/}
            </div>
            <div className={"flex flex-col gap-6"}>
                <h2 className={'header-2'}>
                    Bank Accounts: {totalBanks}
                </h2>
                <div className={"flex flex-col gap-2"}>
                    <p className={'total-balance-label'}>
                        Total Current Balance
                    </p>
                    <p className={'total-balance-amount flex-center gap-2'}>
                        {/*TODO implement AnimatedCounter*/}
                        {/*<AnimatedCounter amount={totalCurrentBalance} />*/}
                        {formatAmount(totalCurrentBalance)}
                    </p>
                </div>
            </div>
        </section>
    )
}