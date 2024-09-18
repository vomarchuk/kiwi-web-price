import type { Metadata } from 'next'
import { Raleway } from '@next/font/google'
import './globals.css'
import { QueryProvider } from '@/Provider'
const raleway = Raleway({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Kiwi Beauty Center',
  description: 'Kiwi Beauty Center website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
