import React from 'react';
import styled from '@emotion/styled';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { theme } from '@/theme';
import { IconButton } from '@mui/material';

export const AddIconButton = ({ onClick }: any) => (
  <ButtonStyled>
    <AddIconButtonStyled onClick={onClick} />
  </ButtonStyled>
);
const ButtonStyled = styled(IconButton)`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0;
`;
const AddIconButtonStyled = styled(AddCircleIcon)`
  cursor: pointer;
  fill: ${theme.accentColor};
  width: 100%;
  height: auto;
  &:hover {
    fill: green;
  }
`;
