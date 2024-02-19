/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import styles from './Product.module.scss'
import { ProductType } from '@/types/product.type'
import Link from 'next/link'

const ProductView = ({products}: {products: ProductType[]}) => {
    return (
        <div className={styles.product}>
            <h1 className={styles.product__title} id='product-title' data-testid="product-title">Product</h1>
            <div className={styles.product__content}>

                {products?.length !== 0 ?
                    products?.map((product: ProductType) => {
                        const {id, name, price, category, image} = product
                        return (
                            <Link key={id} href={`/product/${id}`} className='product__card grid grid-cols-1 auto-rows-min gap-4'>
                                <div>
                                    <Image src={image} alt={name} width={500} height={500} className='w-full object-cover rounded-md' />
                                </div>
                                <h1>{id}</h1>
                                <div className='grid grid-cols-1 auto-rows-min'>
                                    <div className='grid grid-cols-[repeat(2,max-content)] justify-between items-center'>
                                        <h4 className='text-base font-medium'>{name}</h4>
                                        <p className='text-base font-medium pr-4'>{price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</p>
                                    </div>
                                    <p className='text-base text-gray-500 font-medium'>{category}</p>
                                </div>
                            </Link>
                        )
                    }) :
                    [1,2,3,4].map((item, i) => {
                        return (
                            <div key={i} className='product__card w-full grid grid-cols-1 auto-rows-min gap-4'>
                                <div className={`${styles.skeleton} bg-gray-200 rounded aspect-square w-full`}></div>
                                <div className={`${styles.skeleton} rounded grid grid-cols-1 auto-rows-min gap-2`}>
                                    <div className='grid grid-cols-2 items-center gap-2'>
                                        <h4 className={`${styles.skeleton} bg-gray-200 rounded w-full h-6`}></h4>
                                        <p className={`${styles.skeleton} bg-gray-200 rounded w-full h-6`}></p>
                                    </div>
                                    <p className={`${styles.skeleton} bg-gray-200 rounded w-[40%] h-6`}></p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductView