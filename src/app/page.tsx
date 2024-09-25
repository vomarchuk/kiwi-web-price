'use client';
import styled from '@emotion/styled';
import { Header } from './components/Header/Header';
import { Button, Container } from '@mui/material';
import { theme } from '@/theme';
import React from 'react';
export default function Home() {
  return (
    <ContainerStyled>
      <Header />
      <MainStyled>
        <ButtonStyled href="/signin">Zaloguj sie</ButtonStyled>
      </MainStyled>
    </ContainerStyled>
  );
}

const ContainerStyled = styled(Container)`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const MainStyled = styled.main`
  margin-top: 50px;
  text-align: center;
`;
const ButtonStyled = styled(Button)`
  background-color: ${theme.accentColor};
  color: white;
`;
