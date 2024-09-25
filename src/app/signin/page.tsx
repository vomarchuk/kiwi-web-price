'use client';
import { LogoType } from '../../../assets/icons/Logotype';
import { SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signInWithEmail } from '@/api/userOperations';
import LoginForm from '../components/Forms/LoginForm';
import { Container } from '@mui/material';
import styled from '@emotion/styled';
interface IInputs {
  email: string;
  password: string;
}

const SignIn = () => {
  const router = useRouter();
  const [loginErrors, setLoginErrors] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onSubmit: SubmitHandler<IInputs> = async ({ email, password }) =>
    signInWithEmail(email, password, setLoginErrors, setIsLoggedIn);

  useEffect(() => {
    const storedToken =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (storedToken) router.push(`${'/home'}`);
    if (loginErrors) {
      setLoginErrors(null);
    }
  }, [loginErrors, isLoggedIn]);

  return (
    <ContainerStyled>
      <LogoType width={200} />
      <p>Witaj z powrotem</p>
      <LoginForm onSubmit={onSubmit} />
    </ContainerStyled>
  );
};
export default SignIn;

const ContainerStyled = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30vh;
`;
