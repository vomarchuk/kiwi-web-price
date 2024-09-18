import React from 'react'
import { LogoType } from '../../../../assets/icons/Logotype'
import Link from 'next/link'
import { SOCIAL_LINKS } from '@/app/constants/SOCIAL_LINKS'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

export const Header = () => {
  return (
    <header className="flex flex-col justify-center items-center mt-5">
      <LogoType width={200} />
      <ul className="flex justify-center mt-[20px]">
        <li className="inline">
          <Link target="_blank" rel="nofollow" href={SOCIAL_LINKS.FACEBOOK}>
            <FacebookIcon className="text-[#1178f2] w-10 h-auto" />
          </Link>
        </li>
        <li className="inline ml-[15px]">
          <Link href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="nofollow">
            <InstagramIcon className="text-[#E74E53] w-10 h-auto" />
          </Link>
        </li>
      </ul>
    </header>
  )
}
