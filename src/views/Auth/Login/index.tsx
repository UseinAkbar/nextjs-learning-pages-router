import Link from "next/link"
import styles from './Login.module.scss'
import { useRouter } from "next/router"
import { useState } from "react"
import { signIn } from "next-auth/react"
import Image from "next/image"

const LoginViews = () => {
    const {push, query} = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState('')
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const callbackUrl: any = query.callbackUrl || '/'
    
    const handleRegister = () => {
        push('/dashboard')
    }

    const handleChange = (e: any) => {
        const {name, value} = e.target
        setData(preVal => {
            return {
                ...preVal,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setIsLoading(true)
        setIsError('')
        
        try {
            {/* signIn(nama provider, options) */}
            {/* signIn('credentials', {callbackUrl, redirect: false})  */}
            const res = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
                callbackUrl
            })

            if(res?.error) {                
                setIsError('Email or password is incorrect!')
            } else {
                // ketika sukses lgsg redirect ke callbackUrl yg sudah di set sebelumnya di withAuth.ts
                push(callbackUrl)
            }
        } catch (error: any) {
            setIsError('Email or password is incorrect!')
        }
        setIsLoading(false)
    }

    return (
        <div className={styles.login}>
            <h1 className={styles.login__title}>Login Page</h1>
            {isError && <p className="text-red-500 font-medium">*{isError}</p>}
            <form className={styles.login__form} onSubmit={handleSubmit}>
                <div className={styles.login__form_group}>
                    <label htmlFor="email" className={styles.login__form_label}>Email</label>
                    <input onChange={handleChange} type="email" name="email" id="email" placeholder="email" className={styles.login__form_input} value={data.email} />
                </div>
                <div className={styles.login__form_group}>
                    <label htmlFor="password" className={styles.login__form_label}>Password</label>
                    <input onChange={handleChange} type="password" name="password" id="password" placeholder="password" className={styles.login__form_input} value={data.password} />
                </div>
                <button type="submit" className="px-6 py-3 rounded-md bg-black text-white btn" disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
            </form>
            {/* signIn(nama provider, options) */}
            {/* signIn('google', {callbackUrl, redirect: false}), etc */}
            <button onClick={() => signIn('google', {
                callbackUrl,
                redirect: false
            },
            )} className="flex items-center gap-2 px-6 py-3 rounded-md bg-white text-black !font-medium btn">
                <Image src={'/google.svg'} width={20} height={20} alt="Google" />Sign in with Google
            </button>
            <p style={{padding: '6px 10px'}}>Belum punya akun? <Link href="/auth/register">Daftar</Link></p>
        </div>
    )
}

export default LoginViews