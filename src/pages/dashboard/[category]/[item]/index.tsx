import Head from "next/head";
import { useRouter } from "next/router"

export default function Item() {
    const {query} = useRouter()
    console.log(query);
    
    return (
        <div>
            <Head>
                <title>Dashboard</title>
                <meta name="theme-color" content="#113F67" />
            </Head>
            <h1>Category: {query.category}</h1>
            <h1>Item: {query.item}</h1>
        </div>
    )
}