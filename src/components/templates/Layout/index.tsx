import { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './layout.css'
import KeyboardNavigation from '@/components/templates/Layout/KeyboardNavigation'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'Electric Vehicles',
  description: 'Discover and explore the latest electric vehicles.',
  icons: '/favicon.ico',
}

export const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className={`${inter.variable} antialiased`}>
      <KeyboardNavigation />
      <section style={{ padding: 30 }}>{children}</section>
    </main>
  )
}
