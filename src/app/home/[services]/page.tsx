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
import { CategoryType, ServiceType } from '@/app/helpers/schemas';
import { Container } from '@mui/material';
import styled from '@emotion/styled';
const ServicePage = () => {
  const router = useRouter();
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

  return (
    <ContainerStyled>
      {currentCategory && <h1>{currentCategory.name}</h1>}
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
