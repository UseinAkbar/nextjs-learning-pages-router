// simbol @ utk lgsg mengarahkan ke folder tujuan
import Navbar from '@/components/layouts/Navbar'
import { useSession } from 'next-auth/react'
import Head from 'next/head'

export default function Home () {
  const {data}: any = useSession()

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      {/* <Navbar /> */}
      <h1>Hello {data?.user?.fullname || 'there'}</h1>
    </div>
  )
}

