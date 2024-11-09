import {HeaderBar} from '@/components/HeaderBar'
import React from 'react'
import {TotalBalanceBox} from "@/components/TotalBalanceBox";
import {RightSidebar} from "@/components/RightSidebar";

const Home = () => {
    const loggedIn = {
        firstName: "Tomas",
        lastName: "Smith",
        email: "tom@example.com"
    }
    return (
        <section className={'home'}>
            <div className={'home-content'}>
                <header className={'home-header'}>
                    <HeaderBar
                        type={'greeting'}
                        title={'Welcome'}
                        subtext={"Access and manage your account"}
                        user={loggedIn?.firstname || "Guest" }
                    />
                    <TotalBalanceBox
                    accounts={[]}
                    totalBanks={1}
                    totalCurrentBalance={5000}/>
                </header>
                RECENT TRANSCACTIONS
            </div>
            {/* only on HP not part of the layout */}
           <RightSidebar user={loggedIn} transactions={[]} banks={[{currentBalance:5000}, {currentBalance:2000}]} />
        </section>
    )
}
export default Home