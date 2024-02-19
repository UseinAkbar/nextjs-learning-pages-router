import RegisterView from "@/views/Auth/Register"
import Head from "next/head"

const RegisterPage = () => {
    return (
        <>
            <Head>
                <title>Register</title>
                <meta name="theme-color" content="#113F67" />
            </Head>
            <RegisterView />
        </>
    )
}

export default RegisterPage