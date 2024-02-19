import '@/styles/sass/globals.scss'

import type { AppProps } from 'next/app'
import AppShell from '@/components/layouts/AppShell'
import { SessionProvider } from 'next-auth/react'

// seperti App.jsx pada React
export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </SessionProvider>
  ) 
}
