import { signIn, signInWithGoogle } from "@/lib/firebase/service";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'email'},
                password: {label: 'Password', type: 'password'}
            },
            // authorize berguna untuk mengecek ke database, apakah usernya ada atau tidak
            async authorize(credentials) {
                const {email, password} = credentials as {
                    email: string,
                    password: string
                }
                // Add logic here to look up the user into database from the credentials supplied
                // cek data user ke database terlebih dahulu lalu simpan ke variabel user
                const user: any = await signIn(email)
                
                if(user) {
                    // compare antara password inputan user (credentials.password) dan password yg ada di database (user.password)
                    const passwordConfirm = await compare(password, user.password)
                    if(passwordConfirm) return user
                    return null
                } else {
                    return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || ''
        })
    ],
    callbacks: {
        async jwt({token, account, profile, user}: any) {            
            // user yg direturn di authorize ditangkap disini
            if(account?.provider === 'credentials') {
                token.fullname = user.fullname
                token.email = user.email
                token.role = user.role
            }
            if(account?.provider === 'google') {
                // attribut yg biasa direturn oleh Google ketika menggunakan OAuth Google (name, email, image) ditangkap oleh parameter user
                const data = {
                    fullname: user.name,
                    email: user.email,
                    image: user.image,
                    type: 'google'
                }
                // cek data google user apakah sudah terdaftar di db atau belum
                await signInWithGoogle(data, (result: {status: boolean, message: string, data: any}) => {
                    if(result.status) {
                        // assign data token dgn data yg direturn dari response callback
                        token.fullname = result.data.fullname
                        token.email = result.data.email
                        token.image = result.data.image
                        token.type = result.data.type
                        token.role = result.data.role
                    }
                })
                
            }
            return token
        },
        async session({session, token}: any) {            
            // token yg direturn di jwt ditangkap disini dan disimpan ke session
            if('email' in token) {
                session.user.email = token.email
            }
            if('fullname' in token) {
                session.user.fullname = token.fullname
            }
            if('image' in token) {
                session.user.image = token.image
            }
            if('role' in token) {
                session.user.role = token.role
            }
            
            // data session bisa diakses dengan useSession() di page yang diinginkan
            return session
        }
    },
    // jika custom pages ini tidak diset, maka halaman auth akan diarahkan ke built-in page Nextjs nya
    pages: {
        signIn: '/auth/login',
        // signOut: '',
        // error: ''
    }
}

export default NextAuth(authOptions)