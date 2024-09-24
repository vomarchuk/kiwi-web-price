import { Box, Button, InputLabel, TextField } from '@mui/material';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { theme } from '@/theme';
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
            <TextField
              type="password"
              placeholder="password"
              {...register('password')}
            />
          </Box>
        )}
      />

      <SubmitButtonStyled type="submit" disabled={!isValid}>
        Zaloguj się
      </SubmitButtonStyled>
    </form>
  );
};

export default LoginForm;

const SubmitButtonStyled = styled(Button)`
  background-color: ${theme.accentColor};
  color: white;
  margin-top: 10px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);

  &:hover {
    box-shadow: 0px 0px 10px 3px ${theme.accentColor};
  }
`;
