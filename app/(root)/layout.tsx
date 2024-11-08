import {Sidebar} from "@/components/Sidebar";
import Image from 'next/image'
import {MobileNavBar} from "@/components/MobileNavBar";

//layout only for these nested routes
export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {

    //send user into sidebar
    const loggedIn = {
        firstName: "Tomas",
        lastName: "Kravcik",
    }
    return (
        <main className={'flex w-full h-screen font-inter'}>
            <Sidebar user={loggedIn}/>
            {/*mobile*/}
            <div className={'flex flex-col size-full '}>
                <div className={'root-layout'}>
                    <Image src={'/icons/logo.svg'} width={30} height={30} alt={'mobile logo'}/>
                    <div>
                        <MobileNavBar user={loggedIn}/>
                    </div>
                </div>

                {children}
            </div>
        </main>
    );
}

