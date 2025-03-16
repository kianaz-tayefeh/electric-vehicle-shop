import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LinkButton } from '@/components/uikit/Link'

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
        <LinkButton label='Home' link='/' />-
        <LinkButton label='Cars' link='/cars' />-
        <LinkButton label='Bmw' link='/cars/1' />
      </header>
      <section>{children}</section>
      <footer>footer</footer>
    </main>
  )
}
