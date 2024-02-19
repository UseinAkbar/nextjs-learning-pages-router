import LoginViews from "@/views/Auth/Login"
import Head from "next/head"

const LoginPage = () => {

    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="theme-color" content="#113F67" />
            </Head>
            <LoginViews />
        </>
    )
}

export default LoginPage