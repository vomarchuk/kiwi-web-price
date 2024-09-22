import { Box, Button, InputLabel, TextField } from '@mui/material';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export const CreateServiceForm = () => {
  const { register, handleSubmit, reset, control } = useForm();
  const onSubmit = (data: any) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: true }}
        render={() => (
          <Box>
            <InputLabel>Nazwa usługi</InputLabel>
            <TextField
              type="search"
              variant="outlined"
              placeholder="Wprowadz nazwę usługi"
              {...register('name')}
            />
          </Box>
        )}
      />
      <Controller
        name="price"
        control={control}
        rules={{ required: true }}
        render={() => (
          <Box>
            <InputLabel>Cena usługi</InputLabel>
            <TextField
              type="search"
              variant="outlined"
              placeholder="Wprowadz cene usługi"
              {...register('price')}
            />
          </Box>
        )}
      />
      <Controller
        name="duration"
        control={control}
        rules={{ required: true }}
        render={() => (
          <Box>
            <InputLabel>Czas wykonania usługi</InputLabel>
            <TextField
              type="search"
              variant="outlined"
              placeholder="Wprowadz czas wykonania usługi"
              {...register('duration')}
            />
          </Box>
        )}
      />
      <Button type="submit">Dodaj usługe</Button>
    </form>
  );
};
