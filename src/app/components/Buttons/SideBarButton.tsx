import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'
interface ISideBarButton {
  href: string
  label: string
}
export const SideBarButton = ({ href, label }: ISideBarButton) => {
  const router = useRouter()
  const redirect = () => router.push(`/home/${href}`)

  return (
    <Button
      // className="w-full  bg-[#afb1b8]  shadow-buttonBoxShadow text-white h-[50px] text-[12px] font-bold hover:bg-accent"
      onClick={redirect}
    >
      {label}
    </Button>
  )
}
