'use client';
import { Box, Button, Container, InputLabel, TextField } from '@mui/material';
import { LogoType } from '../../../assets/icons/Logotype';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logoutUser, signInWithEmail } from '@/api/userOperations';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/store/selectors';
interface IInputs {
  email: string;
  password: string;
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<IInputs>({
    defaultValues: {
      email: 'mr.volodymyr.marchuk@gmail.com',
      password: 'Vova18021987',
    },
  });
  const userAccess = useSelector(userSelectors.userAccess);
  const router = useRouter();
  const regex = /^[0-9a-zA-Z!@#$%^&*()-_+=,.<>:?/|[\]{}"'~`]*$/;
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: regex,
              message: 'Pole nie może zawierać specjalnych znaków',
            },
          }}
          render={() => (
            <Box>
              <InputLabel>Email</InputLabel>
              <TextField placeholder="email" {...register('email')} />
            </Box>
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: true,
          }}
          render={() => (
            <Box>
              <InputLabel>Password</InputLabel>
              <TextField placeholder="password" {...register('password')} />
            </Box>
          )}
        />

        <Button type="submit" disabled={!isValid}>
          Zaloguj się
        </Button>
      </form>
      <Button onClick={(isLoggedIn: any) => logoutUser(isLoggedIn)}>
        Wyloguj się
      </Button>
    </div>
  );
};
export default SignIn;
