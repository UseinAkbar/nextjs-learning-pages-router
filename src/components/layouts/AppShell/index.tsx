import Footer from "@/components/Footer"
import { useRouter } from "next/router"
import path from "path"
import { Roboto } from "next/font/google"
import dynamic from "next/dynamic"

// dynamic import -> mirip React.lazy()
const Navbar = dynamic(() => import("../Navbar"))

type AppShellProps = {
    children: React.ReactNode
}

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700']
})

const disableNavbar = ["/auth/login", "/auth/register", "/404"]

const AppShell = (props: AppShellProps) => {
    const {pathname} = useRouter()
    const {children} = props
    
    return (
        <main id="AppShell" className={roboto.className}>
            {!disableNavbar.includes(pathname) && <Navbar />}
            {children}
        </main>
    )
}

export default AppShell