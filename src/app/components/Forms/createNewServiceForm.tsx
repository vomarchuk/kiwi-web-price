'use client';
import { ServiceType } from '@/app/helpers/schemas';
import { Box, Button, InputLabel, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { addNewItem, fetchItems } from '@/api/firebaseFunctions';
import { useQuery, useQueryClient } from '@tanstack/react-query';
export const CreateServiceForm = ({
  handleCloseModal,
  editServiceId = null,
}: any) => {
  console.log(editServiceId);

  const { register, handleSubmit, watch, reset, control } = useForm({
    defaultValues: {
      name: '',
      price: '',
      duration: '',
      categoryId: '',
    },
  });
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('id');
  const x = watch('categoryId');

  const { data: dataServices } = useQuery({
    queryKey: ['services'],
    queryFn: async () => await fetchItems('services'),
  });

  const onSubmit = async (data: any) => {
    const newService = {
      ...data,
      id: uuidv4(),
      categoryId,
    };
    await addNewItem(newService, 'services');
    reset();
    handleCloseModal();
    queryClient.invalidateQueries(['services'] as any);
  };
  useEffect(() => {
    const serviceData =
      dataServices &&
      dataServices.find((service: any) => service.id === editServiceId);
    if (serviceData) {
      reset(serviceData);
    }
  }, [editServiceId, reset]);
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
