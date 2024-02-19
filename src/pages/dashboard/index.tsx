import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Dashboard () {
  
  return (
    <div>
      <Head>
          <title>Dashboard</title>
        <meta name="theme-color" content="#113F67" />
      </Head>
      <h1>Dashboard</h1>
    </div>
  )
}

