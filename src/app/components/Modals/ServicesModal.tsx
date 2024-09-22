import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import { CreateServiceForm } from '../Forms/createNewServiceForm';
import { theme } from '@/theme';

interface ICreateServiceForm {
  open: boolean;
  handleClose: () => void;
  title?: string;
}
export const ServicesModal = ({
  open,
  handleClose,
  title,
}: ICreateServiceForm) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ContainerStyled>
        <HeaderContainerStyled>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Dodaj usługe do kategorii {title?.toLowerCase()}
          </Typography>
          <CloseIconStyled onClick={handleClose} />
        </HeaderContainerStyled>
        <CreateServiceForm />
      </ContainerStyled>
    </Modal>
  );
};

const ContainerStyled = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 20px;
  background-color: white;
  box-shadow: 10px 0px 10px rgba(0, 0, 0, 0.2);
`;
const HeaderContainerStyled = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const CloseIconStyled = styled(CloseIcon)`
  fill: ${theme.accentColor};
  width: 24px;
  height: 24px;
  border: 2px solid ${theme.accentColor};
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    box-shadow: 1px 1px 22px ${theme.accentColor};
    transition: box-shadow 0.2s ease;
  }
`;
