import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import { CreateServiceForm } from '../Forms/createNewServiceForm';

interface ICreateServiceForm {
  open: boolean;
  handleClose: () => void;
}
export const ServicesModal = ({ open, handleClose }: ICreateServiceForm) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <BoxStyled>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal!!!
        </Typography>
        <Button onClick={handleClose}>
          <CloseIcon />
        </Button>
        <CreateServiceForm />
      </BoxStyled>
    </Modal>
  );
};

const BoxStyled = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 20px;
  background-color: white;
  box-shadow: 10px 0px 10px rgba(0, 0, 0, 0.2);
`;
