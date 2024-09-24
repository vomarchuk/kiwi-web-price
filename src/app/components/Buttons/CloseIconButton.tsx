import React from 'react';
import { theme } from '@/theme';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';

interface ICloseIconButton {
  onClick: () => void;
}
export const CloseIconButton = ({ onClick }: ICloseIconButton) => {
  return <CloseIconStyled onClick={onClick} />;
};

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
