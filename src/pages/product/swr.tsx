// using Client Side Rendering

import ProductLayout from "@/components/layouts/Product"
import { fetcher } from "@/lib/swr/fetcher";
import ProductView from "@/views/Product"
import useSWR from "swr"

const ProductPageSWR = () => {
    //  Fetch data di CSR dilakukan di client, sehingga jika ada perubahan data di database akan tetap terupdate (akan tetap di fetch) meskipun sudah di build
    const { data, error, isLoading } = useSWR("/api/product", fetcher);
    
    return (
        <ProductLayout>
            <ProductView products={isLoading ? [] : data?.data} />
        </ProductLayout>
    )
}

export default ProductPageSWR