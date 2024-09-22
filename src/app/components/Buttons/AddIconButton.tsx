import React from 'react';
import styled from '@emotion/styled';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { theme } from '@/theme';
import { Button } from '@mui/material';

export const AddIconButton = ({ onClick }: any) => (
  <ButtonStyled>
    <AddIconButtonStyled onClick={onClick} />
  </ButtonStyled>
);
const ButtonStyled = styled(Button)`
  border: 1px solid tomato;
  border-radius: 50%;
`;
const AddIconButtonStyled = styled(AddCircleIcon)`
  cursor: pointer;
  fill: ${theme.accentColor};
  width: 45px;
  height: 45px;
  &:hover {
    fill: green;
  }
`;
