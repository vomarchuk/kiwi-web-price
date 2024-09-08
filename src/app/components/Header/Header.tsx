import React from 'react'
import { LogoType } from '../../../../assets/icons/Logotype'
import Link from 'next/link'
import { SOCIAL_LINKS } from '@/app/constants/SOCIAL_LINKS'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

export const Header = () => {
  return (
    <header>
      <LogoType />
      <ul className="flex justify-center mt-[20px]">
        <li className="inline">
          <Link target="_blank" rel="nofollow" href={SOCIAL_LINKS.FACEBOOK}>
            <FacebookIcon className="text-[blue]" />
          </Link>
        </li>
        <li className="inline">
          <Link href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="nofollow">
            <InstagramIcon className="text-[orange]" />
          </Link>
        </li>
      </ul>
    </header>
  )
}
