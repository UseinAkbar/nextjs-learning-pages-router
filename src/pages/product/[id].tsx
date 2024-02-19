import { useRouter } from "next/router"
import ProductLayout from "@/components/layouts/Product";
import useSWR from "swr"
import { fetcher } from "@/lib/swr/fetcher";
import DetailProduct from "@/views/DetailProduct";
import { ProductType } from "@/types/product.type";

const DetailProductPage = ({product}: {product: ProductType}) => {
    // Client Side Rendering
    // const {query} = useRouter()
    // const { data, error, isLoading } = useSWR(`/api/product/${query.id}`, fetcher);
    
    return (
        <ProductLayout>
            {/* Client Side Rendering */}
            {/* <DetailProduct product={isLoading ? {} : data.data} /> */}

            {/* Server Side Rendering & Static Site Generation */}
            <DetailProduct product={product} />
        </ProductLayout>
    )
}

export default DetailProductPage

// Server Side Rendering in dynamic routing
export async function getServerSideProps(context: any) {
    const id = context.params.id
    
    // fetch data
    const data = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/product/${id}`)
    .then(res => res.json())
    .then(response => response.data)
    
    return {
        props: {
            product: data
        }
    }
}

// Static Site Generation in dynamic routing
// export async function getStaticPaths() {
//     // fetch data
//     const data = await fetch(`http://localhost:3000/api/product`)
//     .then(res => res.json())
//     .then(response => response.data)

//     const paths = data.map((product: ProductType) => {
//         // params yg di return harus sesuai sama nama file dynamic routenya (id)
//         return {
//             params: {
//                 id: product.id
//             }
//         }
//     })

//     return {paths, fallback: false}
// }

// Static Site Generation in dynamic routing
// export async function getStaticProps(context: any) {
//     const id = context.params.id
    
//     // fetch data
//     const data = await fetch(`http://localhost:3000/api/product/${id}`)
//     .then(res => res.json())
//     .then(response => response.data)
    
//     return {
//         props: {
//             product: data
//         }
//     }
// }