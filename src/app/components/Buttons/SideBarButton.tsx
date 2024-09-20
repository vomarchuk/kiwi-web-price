import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { theme } from '@/theme';
interface ISideBarButton {
  href: string;
  label: string;
}
export const SideBarButton = ({ href, label }: ISideBarButton) => {
  const router = useRouter();
  const redirect = () => router.push(`/home/${href}`);

  return <ButtonStyled onClick={redirect}>{label}</ButtonStyled>;
};

const ButtonStyled = styled(Button)`
  width: 100%;
  height: 40px;
  font-weight: bold;
  font-size: 10px;
  background-color: ${theme.accentColor};
  color: white;
  &:hover {
    background-color: red;
  }
`;
