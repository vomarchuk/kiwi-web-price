'use client';
import styled from '@emotion/styled';
import { Header } from './components/Header/Header';
import { Button } from '@mui/material';
import { theme } from '@/theme';
export default function Home() {
  return (
    <>
      <Header />
      <MainStyled>
        <ButtonStyled href="/signin">Zaloguj sie</ButtonStyled>
      </MainStyled>
    </>
  );
}

const MainStyled = styled.main`
  margin-top: 50px;
  text-align: center;
`;
const ButtonStyled = styled(Button)`
  background-color: ${theme.accentColor};
  color: white;
`;
