import { useRouter } from "next/router"
import Link from "next/link";

const DetailShopPage = () => {
    const {query} = useRouter()

    console.log(query.items);
    
    return (
        <div>
            <h1>Detail Shop</h1>
            <h3>Shop: {query.items}</h3>
            <Link href="/product/baju">Baju</Link>
        </div>
    )
}

export default DetailShopPage