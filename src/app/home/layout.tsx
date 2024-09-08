'use client'
import { Header } from '../components/Header/Header'
import { SideBar } from '../components/Layout/SideBar/SideBar'

interface ViewProps {
  children: React.ReactNode
}
export default function HomePageLayout({ children }: ViewProps) {
  console.log('hello')

  return (
    <>
      <Header />
      <SideBar />
      {children}
    </>
  )
}
