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
const ServicePage = () => {
  const router = useRouter();
  const categoryId = useSearchParams().get('id');
  if (!categoryId) return;
  const { data: dataService } = useQuery({
    queryKey: ['services'],
    queryFn: async () => await fetchItems('services'),
  });

  const currentServiceCollection = dataService?.filter(
    (service: any) => service.categoryId === categoryId,
  );
  return (
    // <div>
    //   <h1>Dynamic Route</h1>
    //   {currentServiceCollection &&
    //     currentServiceCollection.map((service: any) => (
    //       <li key={service.id}>
    //         <p>{service.categoryName}</p>
    //         <p>{service.name}</p>
    //       </li>
    //     ))}
    // </div>
    <>
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
    </>
  );
};

export default ServicePage;

// W154NGGXXF3kHwwtgyY7; mani
// 48AGR5DdAwE7mcElvWXg pedi
