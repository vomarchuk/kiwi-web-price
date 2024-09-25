'use client';
import { fetchUserData, getCurrentUserUid } from '@/api/userOperations';
import { Box, Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
const HomePage = () => {
  const [userId, setUserId] = useState('');

  const { data: dataUser } = useQuery<any>({
    queryKey: ['user'],
    queryFn: async () => await fetchUserData(userId),
  });

  useEffect(() => {
    const fetchUid = async () => {
      try {
        const uid = await getCurrentUserUid();
        setUserId(uid as string); // Assert uid as a string
      } catch (error) {
        console.error('Error fetching user UID:', error);
      }
    };

    fetchUid();
  }, []);

  return (
    <Container>
      <ContainerStyled>
        {dataUser && dataUser.firstName === 'Vita-Veronika' && (
          <h1>Witam, moja kochana!</h1>
        )}
      </ContainerStyled>
    </Container>
  );
};
export default HomePage;

const ContainerStyled = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
