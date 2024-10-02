'use client';
import { CategoryType, ServiceType } from '@/app/helpers/schemas';
import { Box, Button, InputLabel, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { addNewItem, EditItemById, fetchItems } from '@/api/firebaseFunctions';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { theme } from '@/theme';
import styled from '@emotion/styled';
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
      categoryName: '',
    },
  });
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('id');

  const { data: dataCategories } = useQuery<CategoryType[]>({
    queryKey: ['categories'],
    queryFn: async () => await fetchItems('categories'),
  });

  const { data: dataServices } = useQuery<ServiceType[]>({
    queryKey: ['services'],
    queryFn: async () => await fetchItems('services'),
  });

  const onSubmit = async (data: ServiceType) => {
    const currentCategory = dataCategories?.find(
      (category) => category.id === categoryId,
    );
    const newService: ServiceType = {
      ...data,
      id: editServiceId || uuidv4(),
      categoryId: categoryId || '',
      categoryName: currentCategory?.name || '',
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
          <BoxStyled>
            <InputLabel>Nazwa usługi</InputLabel>
            <TextFieldStyled
              type="search"
              variant="outlined"
              placeholder="Wprowadz nazwę usługi"
              {...register('name')}
            />
          </BoxStyled>
        )}
      />
      <Controller
        name="price"
        control={control}
        rules={{ required: true }}
        render={() => (
          <BoxStyled>
            <InputLabel>Cena usługi</InputLabel>
            <TextFieldStyled
              type="search"
              variant="outlined"
              placeholder="Wprowadz cene usługi"
              {...register('price')}
            />
          </BoxStyled>
        )}
      />
      <Controller
        name="duration"
        control={control}
        rules={{ required: true }}
        render={() => (
          <BoxStyled>
            <InputLabel>Czas wykonania usługi</InputLabel>
            <TextFieldStyled
              type="search"
              variant="outlined"
              placeholder="Wprowadz czas wykonania usługi"
              {...register('duration')}
            />
          </BoxStyled>
        )}
      />
      <ButtonStyled type="submit">Dodaj usługe</ButtonStyled>
    </form>
  );
};
const BoxStyled = styled(Box)`
  margin-top: 10px;
`;
const TextFieldStyled = styled(TextField)`
  width: 100%;
`;
const ButtonStyled = styled(Button)`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-weight: bold;
  font-size: 10px;
  background-color: ${theme.accentColor};
  color: white;
  &:hover {
    background-color: green;
  }
`;
