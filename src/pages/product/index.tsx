// using Client Side Rendering

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const ProductLayout = dynamic(() => import("@/components/layouts/Product"))
const ProductView = dynamic(() => import("@/views/Product"))

const ProductPage = () => {
    const [products, setProducts] = useState([])
    const {push, query} = useRouter()
    console.log(query);
    
    
    const fetchProduct = async () => {
        const data = await fetch("/api/product")
        .then(res => res.json())
        .then(response => response.data)

        console.log(data);
        setProducts(data)
    }
    //  Fetch data di CSR dilakukan di client, sehingga jika ada perubahan data di database akan tetap terupdate (akan tetap di fetch) meskipun sudah di build
    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <ProductLayout>
            <ProductView products={products} />
        </ProductLayout>
    )
}

export default ProductPage