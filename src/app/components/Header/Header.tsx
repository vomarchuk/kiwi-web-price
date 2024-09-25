import React from 'react';
import { LogoType } from '../../../../assets/icons/Logotype';
import Link from 'next/link';
import { SOCIAL_LINKS } from '@/app/constants/SOCIAL_LINKS';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import styled from '@emotion/styled';

export const Header = () => {
  return (
    <HeaderStyled>
      <LogoType width={200} />
      <ListStyled>
        <ItemStyled>
          <Link target="_blank" rel="nofollow" href={SOCIAL_LINKS.FACEBOOK}>
            <FacebookIconStyled />
          </Link>
        </ItemStyled>
        <ItemStyled>
          <Link href={SOCIAL_LINKS.INSTAGRAM} target="_blank" rel="nofollow">
            <InstagramIconStyled />
          </Link>
        </ItemStyled>
      </ListStyled>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ListStyled = styled.ul`
  margin-top: 20px;
  padding: 0;
  text-align: center;
`;
const ItemStyled = styled.li`
  display: inline;
`;
const FacebookIconStyled = styled(FacebookIcon)`
  color: #1178f2;
  width:10px
  height: auto;
  `;
const InstagramIconStyled = styled(InstagramIcon)`
  color: #E74E53;
  width:10px
  height: auto;
  margin-left:15px;
  `;
