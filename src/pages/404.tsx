/* eslint-disable @next/next/no-img-element */
import styles from '@/styles/sass/404.module.scss'
import notFound from '../../public/404.svg'
import Image from 'next/image'
import Head from 'next/head'

const Custom404 = () => {
    return (
        <div className={styles.error}>
            <Head>
                <title>404 Not Found</title>
            </Head>
            
            <div>
                <Image src='/404.svg' alt='404 not found' width={500} height={500} className={styles.error__img} />
                
                {/* "/" di Nextjs lgsg masuk ke folder public */}
                {/* <img src="/404.svg" alt="" className={styles.error__img} /> */}
                <h1 className={styles.error__title}>Halaman tidak ditemukan</h1>
            </div>
        </div>
    )
}

export default Custom404