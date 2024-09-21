'use client';
import { Button } from '@mui/material';
import { LogoType } from '../../../assets/icons/Logotype';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logoutUser, signInWithEmail } from '@/api/userOperations';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/store/selectors';
import LoginForm from '../components/Forms/LoginForm';
interface IInputs {
  email: string;
  password: string;
}

const SignIn = () => {
  const userAccess = useSelector(userSelectors.userAccess);
  const router = useRouter();
  const [loginErrors, setLoginErrors] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onSubmit: SubmitHandler<IInputs> = async ({ email, password }) =>
    signInWithEmail(email, password, setLoginErrors, setIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) router.push(`${userAccess ? '/home' : '/accessDenied'}`);
    if (loginErrors) {
      setLoginErrors(null);
    }
  }, [loginErrors, isLoggedIn]);

  return (
    <div>
      <LogoType width={200} />
      <p>Witaj z powrotem</p>
      <LoginForm onSubmit={onSubmit} />
      {/* <Button onClick={(isLoggedIn: any) => logoutUser(isLoggedIn)}>
        Wyloguj się
      </Button> */}
    </div>
  );
};
export default SignIn;
