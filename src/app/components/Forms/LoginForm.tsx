import { Box, Button, InputLabel, TextField } from '@mui/material';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface IInputs {
  email: string;
  password: string;
}
interface LoginFormProps {
  onSubmit: SubmitHandler<IInputs>;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
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

  const regex = /^[0-9a-zA-Z!@#$%^&*()-_+=,.<>:?/|[\]{}"'~`]*$/;

  return (
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
  );
};

export default LoginForm;
