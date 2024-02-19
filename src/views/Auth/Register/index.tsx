import Link from "next/link"
import styles from './Register.module.scss'
import { useRouter } from "next/router"
import { useState } from "react"

const RegisterViews = () => {
    const {push} = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState('')
    const [data, setData] = useState({
        email: '',
        fullname: '',
        password: ''
    })
    
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
        await fetch('/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => {
            if(res.status === 200) {
                setData({email: '', fullname: '', password: ''})
                push('/auth/login')
            } else {                
                setIsError(res.status === 400 ? 'Email already exist' : '')
            }
            console.log(res);
            
        })
        setIsLoading(false)
    }

    return (
        <div className={styles.register}>
            <h1 className={styles.register__title}>Register Page</h1>
            {isError && <p className="text-red-500 font-medium">*{isError}</p>}
            <form className={styles.register__form} method="POST" onSubmit={handleSubmit}>
                <div className={styles.register__form_group}>
                    <label htmlFor="email" className={styles.register__form_label}>Email</label>
                    <input onChange={handleChange} type="email" name="email" id="email" placeholder="email" className={styles.register__form_input} value={data.email} />
                </div>
                <div className={styles.register__form_group}>
                    <label htmlFor="fullname" className={styles.register__form_label}>Fullname</label>
                    <input onChange={handleChange} type="text" name="fullname" id="fullname" placeholder="fullname" className={styles.register__form_input} value={data.fullname} />
                </div>
                <div className={styles.register__form_group}>
                    <label htmlFor="password" className={styles.register__form_label}>Password</label>
                    <input onChange={handleChange} type="password" name="password" id="password" placeholder="password" className={styles.register__form_input} value={data.password} />
                </div>
                <button type="submit" className="px-6 py-3 bg-black text-white rounded-md btn" disabled={isLoading}>{isLoading ? 'Loading...' : 'Register'}</button>
            </form>
            <p style={{padding: '6px 10px'}}>Sudah punya akun? <Link href="/auth/login">Login</Link></p>
        </div>
    )
}

export default RegisterViews