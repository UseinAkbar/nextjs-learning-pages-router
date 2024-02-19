// using Server Side Rendering

import ProductLayout from "@/components/layouts/Product"
import ProductView from "@/views/Product"
import { ProductType } from "@/types/product.type"

const ProductPage = ({products}: {products: ProductType[]}) => {
    return (
        <ProductLayout>
            <ProductView products={products} />
        </ProductLayout>
    )
}

export default ProductPage

// SSR
// Fetch data di SSR dilakukan saat runtime, sehingga jika ada perubahan data di database akan tetap terupdate (akan tetap di fetch) meskipun sudah di build
// semua yang di dalam getServerSideProps() dieksekusi di server, bukan di client/browser
export async function getServerSideProps() {
    // fetch data
    const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/product`)
    .then(res => res.json())
    .then(response => response.data)

    return {
        props: {
            products: data
        }
    }
}