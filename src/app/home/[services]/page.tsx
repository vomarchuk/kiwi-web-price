'use client';
import { fetchItems } from '@/api/firebaseFunctions';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import { CategoryType, ServiceType } from '@/app/helpers/schemas';
import {
  AppBar,
  Button,
  Container,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
const ServicePage = () => {
  const router = useRouter();
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

  return (
    <ContainerStyled>
      {currentCategory && <h1>{currentCategory.name}</h1>}

      <Button onClick={handleClickOpen}>add new service</Button>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <input type="text" />

          <ListItemButton>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItemButton>
        </List>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Usługa</TableCell>
              <TableCell>Cena</TableCell>
              <TableCell>Czas wykonania</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentServiceCollection &&
              currentServiceCollection.map((service: any) => (
                <TableRow key={service.id}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.price} zł</TableCell>
                  <TableCell>{service.duration} min</TableCell>
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

export default ServicePage;

// W154NGGXXF3kHwwtgyY7; mani
// 48AGR5DdAwE7mcElvWXg pedi
