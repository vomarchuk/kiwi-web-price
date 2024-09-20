'use client';
import { useEffect } from 'react';
import { Header } from '../components/Header/Header';
import { SideBar } from '../components/Layout/SideBar/SideBar';
import { useRouter } from 'next/navigation';

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
    <>
      <Header />
      <main className="flex">
        <SideBar />
        {children}
      </main>
    </>
  );
}
