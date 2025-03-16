import { Geist, Geist_Mono } from 'next/font/google'

import { LinkButton } from '@/components/uikit/LinkButton'
import { ROUTES } from '@/constants/common.constants'

import './layout.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <header>
        <LinkButton label='Home' link={ROUTES.home} />-
        <LinkButton label='Cars' link={ROUTES.cars} />-
      </header>
      <section style={{ padding: 30 }}>{children}</section>
    </main>
  )
}
