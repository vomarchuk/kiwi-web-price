import { Metadata } from 'next/types'
import './globals.css'
import { QueryProvider } from '@/Provider'

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
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
