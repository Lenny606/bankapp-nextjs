import {HeaderBar} from '@/components/HeaderBar'
import React from 'react'

const Home = () => {
    const loggedIn = {
        firstname: "Tomas"
    }
    return (
        <section className={'home'}>
            <div className={'home-content'}>
                <div className={'home-header'}>
                    <HeaderBar
                        type={'greeting'}
                        title={'Welcome'}
                        subtext={"Access and manage your account"}
                        user={loggedIn?.firstname || "Guest" }
                    />
                </div>
            </div>
        </section>
    )
}
export default Home