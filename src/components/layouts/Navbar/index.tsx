import { signIn, signOut, useSession } from 'next-auth/react'
import styles from './Navbar.module.css'
import Script from 'next/script';
import Image from 'next/image';

const Navbar = () => {
    const {data}: any = useSession()
    console.log(data);
    
    
    return (
        <nav className={styles.navbar}>
            <h1 className='big' id='title'></h1>
            <Script id='script-title' strategy='lazyOnload'>
                {`document.querySelector('#title').textContent = 'Navbar'`}
            </Script>
            <div className='flex items-center gap-4'>
                <h2>{data && data.user.fullname}</h2>
                {data.user.image && <Image width={200} height={200} src={data.user.image} alt={data.user.fullname} className='rounded-full w-12 h-12' />}
                {data ? 
                <button onClick={() => signOut()} className='bg-white text-black font-medium rounded-md px-4 py-2'>Sign Out</button> :
                // tiap button di klik Sign In, maka method signIn() next-auth udh otomatis create callbackUrl-nya + redirect ke custom page loginnya yg udh diset di [...nextauth].ts
                // <button onClick={() => signIn(provider.id)}>
                //     Sign in with {provider.name}
                // </button>
                <button onClick={() => signIn()} className='bg-white text-black font-medium rounded-md px-4 py-2'>Sign In</button>
                }
            </div>
        </nav>
    )
}

export default Navbar