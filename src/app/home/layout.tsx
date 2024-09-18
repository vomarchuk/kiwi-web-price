'use client'
import { Header } from '../components/Header/Header'
import { SideBar } from '../components/Layout/SideBar/SideBar'

interface ViewProps {
  children: React.ReactNode
}
export default function HomePageLayout({ children }: ViewProps) {
  return (
    <>
      <Header />
      <main className="flex">
        <SideBar />
        {children}
      </main>
    </>
  )
}
