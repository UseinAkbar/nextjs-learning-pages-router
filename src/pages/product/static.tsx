// using Static Site Generation

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

// SSG
// Fetch data di SSG dilakukan saat buildtime & karena sifatnya yang static, maka data yang akan ditampilkan hanya yang sudah di build, dia tidak akan fetch data lagi jika ada perubahan (kecuali di build lagi)
// semua yang di dalam getStaticProps() dieksekusi di server, bukan di client/browser

export async function getStaticProps() {
    // fetch data
    // const data = await fetch("http://localhost:3000/api/product")
    // .then(res => res.json())
    // .then(response => response.data)
    const data: any = [
        {
            category: 'Men\'s Shoes',
            image: 'https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.2/w_429,c_limit/1247bf75-da35-455f-9dce-7cd9b4526a95/air-max-pulse-shoes-2bZSZV.png',
            name: 'Nike Air Max Pulse',
            price: 2379000
        },
        {
            category: 'Men\'s Shoes',
            image: 'https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.2/w_487,c_limit/aa5a276b-715d-4da7-bac2-159edaed11b6/air-max-90-shoes-mnCmVT.png',
            name: 'Nike Air Max 90',
            price: 1799000
        },
        {
            category: 'Women\'s Shoes',
            image: 'https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.2/w_487,c_limit/435d97b7-a132-4dd4-917c-3184a0e0453e/tech-hera-shoes-5nq79L.png',
            name: 'Nike Tech Hera',
            price: 1729000
        },
        {
            category: 'Women\'s Shoes',
            image: 'https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.1/w_522,c_limit/18b5398f-a371-4fa9-9912-3ccfe4eef22c/dunk-low-twist-shoes-V6NqFG.png',
            name: 'Nike Dunk Low Twist',
            price: 2499000
        }
    ]

    return {
        props: {
            products: data
        },
        // revalidate: 10 //refetching data after 10 seconds based on if data changed or not
        // using revalidate is ISR rendering
    }
}