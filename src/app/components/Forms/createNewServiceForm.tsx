'use client';
import { ServiceType } from '@/app/helpers/schemas';
import { Box, Button, InputLabel, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { addNewItem, EditItemById, fetchItems } from '@/api/firebaseFunctions';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface ICreateServiceForm {
  handleCloseModal: () => void;
  editServiceId: string | null;
}

export const CreateServiceForm = ({
  handleCloseModal,
  editServiceId = null,
}: ICreateServiceForm) => {
  const { register, handleSubmit, reset, control } = useForm<ServiceType>({
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

  const { data: dataServices } = useQuery<ServiceType[]>({
    queryKey: ['services'],
    queryFn: async () => await fetchItems('services'),
  });

  const onSubmit = async (data: ServiceType) => {
    const newService: ServiceType = {
      ...data,
      id: editServiceId || uuidv4(),
      categoryId: categoryId || '',
    };
    if (editServiceId) {
      await EditItemById(newService, 'services');
    } else {
      await addNewItem(newService, 'services');
    }
    reset();
    handleCloseModal();
    queryClient.invalidateQueries({ queryKey: ['services'] });
  };
  useEffect(() => {
    const serviceData =
      dataServices &&
      dataServices.find((service) => service.id === editServiceId);
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
