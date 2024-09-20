import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { theme } from '@/theme';
interface ISideBarButton {
  href: string;
  label: string;
  categoryId?: string;
}
export const SideBarButton = ({ href, label, categoryId }: ISideBarButton) => {
  const router = useRouter();
  const categoryIdByParams = useSearchParams().get('id');
  // console.log(categoryId);
  // console.log(href);
  if (categoryId === categoryIdByParams) {
    console.log(label);
  }
  const redirect = () => router.push(`/home/${href}`);

  return (
    <ButtonStyled
      onClick={redirect}
      isActive={categoryId === categoryIdByParams}
    >
      {label}
    </ButtonStyled>
  );
};

interface IButtonStyled {
  isActive: boolean;
}

const ButtonStyled = styled(Button)<IButtonStyled>`
  width: 100%;
  height: 40px;
  font-weight: bold;
  font-size: 10px;
  background-color: ${({ isActive }) =>
    isActive ? 'green' : theme.accentColor};
  color: white;
  &:hover {
    background-color: green;
  }
`;
