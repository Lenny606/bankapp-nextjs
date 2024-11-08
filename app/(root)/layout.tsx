import {Sidebar} from "@/components/Sidebar";

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
            {children}
        </main>
    );
}

