'use client';
import { Box, Button, Container, InputLabel, TextField } from '@mui/material';
import { LogoType } from '../../../assets/icons/Logotype';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

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
  } = useForm<IInputs>();
  const onSubmit: SubmitHandler<IInputs> = ({ email, password }) => {
    console.log(email, password);
  };

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
    </div>
  );
};
export default SignIn;
