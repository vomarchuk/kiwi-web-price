'use client'
import { LogoType } from '../../assets/icons/Logotype'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import Link from 'next/link'
import { SOCIAL_LINKS } from './constants/SOCIAL_LINKS'
import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '@/api/categoryOperations'
import { SideBar } from './components/Layout/SideBar/SideBar'
import { Header } from './components/Header/Header'
export default function Home() {
  const { data: dataCategory } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await getAllCategories(),
  })
  return (
    <>
      <Header />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <SideBar />
        <p>main</p>
      </main>
      <footer>
        <p>footer</p>
      </footer>
    </>
  )
}

// <div className="flex justify-center h-[100vh] items-center">
//   <div className="text-center">
//     <h1 className="text-[72px]">404</h1>
//     <p className="text-[24px] mt-[20px]">
//       Oops! The page you're looking for doesn't exist.
//     </p>
//   </div>
// </div>
