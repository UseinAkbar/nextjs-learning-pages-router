/* eslint-disable @next/next/no-img-element */
import { ProductType } from "@/types/product.type"
import Head from "next/head"

const DetailProduct = ({product}: {product: ProductType}) => {
    const {name='', price='', category='', image=''} = product
    return (
        <div className="grid grid-cols-1 gap-5 p-4">
            <Head>
                <title>{name}</title>
            </Head>
            <h1 className="text-center text-3xl font-bold">Detail Product </h1>
            <div className='product__card grid grid-cols-[repeat(2,max-content)] auto-rows-min items-center gap-4'>
                <div className="w-56">
                    <img src={image} alt={name} className='w-full object-cover rounded-md' />
                </div>
                <div className='grid grid-cols-1 auto-rows-min gap-4'>
                    <div className='grid grid-cols-1 gap-4'>
                        <h4 className='text-base font-medium'>{name}</h4>
                        <p className='text-base font-medium pr-4'>{price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</p>
                    </div>
                    <p className='text-base text-gray-500 font-medium'>{category}</p>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct