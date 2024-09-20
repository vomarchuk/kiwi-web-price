'use client';
import { useEffect } from 'react';
import { Header } from '../components/Header/Header';
import { SideBar } from '../components/Layout/SideBar/SideBar';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import { Container } from '@mui/material';

interface ViewProps {
  children: React.ReactNode;
}
export default function HomePageLayout({ children }: ViewProps) {
  const router = useRouter();
  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      return router.push('/');
    }
  });
  return (
    <Container>
      <Header />
      <MainStyled>
        <SideBar />
        {children}
      </MainStyled>
    </Container>
  );
}

const MainStyled = styled.main`
  display: flex;
`;
