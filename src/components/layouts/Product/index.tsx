import Footer from "@/components/Footer"
import Navbar from "../Navbar"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Head from "next/head"

type ProductLayoutProps = {
    children: React.ReactNode
}

const ProductLayout = (props: ProductLayoutProps) => {
    const {children} = props
    const {push} = useRouter()
    const [isLogin, setLogin] = useState(true)

    useEffect(() => {
        if(!isLogin) push('/auth/login')
    }, [])

    return (
        <div id="ProductLayout">
            <Head>
                <title>Product</title>
            </Head>
            {children}
        </div>
    )
}

export default ProductLayout