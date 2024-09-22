'use client';
import { fetchItems, removeItem } from '@/api/firebaseFunctions';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CategoryType, ServiceType } from '@/app/helpers/schemas';
import { Button, Container } from '@mui/material';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import { ServicesModal } from '@/app/components/Modals/ServicesModal';

const ServicePage = () => {
  const queryClient = useQueryClient();
  const categoryId = useSearchParams().get('id');
  const [open, setOpen] = useState(false);
  if (!categoryId) return;

  const { data: dataCategories } = useQuery<CategoryType[]>({
    queryKey: ['categories'],
    queryFn: async () => await fetchItems('categories'),
  });

  const { data: dataService } = useQuery<ServiceType[]>({
    queryKey: ['services'],
    queryFn: async () => await fetchItems('services'),
  });
  const currentCategory = dataCategories?.find(
    (category) => category.id === categoryId,
  );
  const currentServiceCollection = dataService?.filter(
    (service) => service.categoryId === categoryId,
  );

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const removeItemById = (serviceId: string) => {
    removeItem('services', serviceId);
    queryClient.invalidateQueries(['services'] as any);
  };
  return (
    <ContainerStyled>
      {currentCategory && <h1>{currentCategory.name}</h1>}

      <Button onClick={handleClickOpen}>add new service</Button>
      <ServicesModal
        open={open}
        handleClose={handleClose}
        title={currentCategory?.name}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Usługa</TableCell>
              <TableCell>Cena</TableCell>
              <TableCell>Czas wykonania</TableCell>
              <TableCell>Usuń</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentServiceCollection &&
              currentServiceCollection.map((service: any) => (
                <TableRow key={service.id}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.price} zł</TableCell>
                  <TableCell>{service.duration} min</TableCell>
                  <TableCell>
                    <CloseIcon onClick={() => removeItemById(service.id)} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ContainerStyled>
  );
};

const ContainerStyled = styled(Container)`
  text-align: center;
`;
const ModalStyled = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: black;
  border: 1px solid tomato;
`;
export default ServicePage;
