'use client';
import { fetchItems, removeItem } from '@/api/firebaseFunctions';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CategoryType, ServiceType } from '@/app/helpers/schemas';
import { Box, Container, IconButton, Menu, MenuItem } from '@mui/material';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { ServicesModal } from '@/app/components/Modals/ServicesModal';
import { AddIconButton } from '@/app/components/Buttons/AddIconButton';
import { theme } from '@/theme';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';

const ServicePage = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [editItemId, setEditItemId] = useState<null | string>(null);

  const openShowVariants = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloses = () => {
    setAnchorEl(null);
  };

  const queryClient = useQueryClient();
  const categoryId = useSearchParams().get('id');
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
  const handleClose = () => {
    setOpen(false);
    setEditItemId(null);
  };
  const removeItemById = (serviceId: string) => {
    removeItem('services', serviceId);
    queryClient.invalidateQueries(['services'] as any);
    handleClose();
  };
  const editItemById = (serviceId: string) => {
    setAnchorEl(null);
    setEditItemId(serviceId);
    handleClickOpen();
  };
  return (
    <ContainerStyled>
      <HeaderBoxStyled>
        {currentCategory && (
          <HeaderTitleStyled>{currentCategory.name}</HeaderTitleStyled>
        )}
        <AddIconButton onClick={handleClickOpen} />
      </HeaderBoxStyled>
      <ServicesModal
        open={open}
        handleClose={handleClose}
        title={currentCategory?.name}
        editItemId={editItemId}
      />

      <TableContainer component={Paper} id="table-title">
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
                    <>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={
                          openShowVariants ? 'long-menu' : undefined
                        }
                        aria-expanded={openShowVariants ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <ModeVariantIconStyled />
                      </IconButton>
                      <Menu
                        id="menu-appBar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={openShowVariants}
                        onClose={handleCloses}
                      >
                        <MenuItem onClick={() => removeItemById(service.id)}>
                          Usuń
                        </MenuItem>
                        <MenuItem onClick={() => editItemById(service.id)}>
                          edytuj
                        </MenuItem>
                      </Menu>
                    </>
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
const HeaderBoxStyled = styled(Box)`
  display: flex;
  align-items: center;
`;
const HeaderTitleStyled = styled.h1`
  margin-right: 20px;
`;

const ModeVariantIconStyled = styled(MoreVertIcon)`
  fill: ${theme.accentColor};
  cursor: pointer;
  &:hover {
    fill: red;
  }
`;

export default ServicePage;
