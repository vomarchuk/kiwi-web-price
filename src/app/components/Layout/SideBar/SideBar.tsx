import { useQuery } from '@tanstack/react-query';
import { SideBarButton } from '../../Buttons/SideBarButton';
import { fetchItems } from '@/api/firebaseFunctions';
import styled from '@emotion/styled';
import { CategoryType, SubMenuType } from '@/app/helpers/schemas';
import { Button } from '@mui/material';
import { logoutUser } from '@/api/userOperations';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const SideBar = () => {
  const [isLogoutUser, setIsLogoutUser] = useState<Boolean>(false);
  const router = useRouter();
  const { data: dataCategory } = useQuery<CategoryType[]>({
    queryKey: ['categories'],
    queryFn: async () => await fetchItems('categories'),
  });
  const { data: dataSubMenu } = useQuery<SubMenuType[]>({
    queryKey: ['subMenu'],
    queryFn: async () => await fetchItems('subMenu'),
  });
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (isLogoutUser || !storedToken) router.push('/');
  }, [isLogoutUser]);
  return (
    <AsideStyled>
      <Button onClick={() => logoutUser(setIsLogoutUser)}>wyloguj się</Button>
      <ListStyled>
        {dataCategory &&
          dataCategory.map((category) => (
            <ItemStyled key={category.id}>
              <SideBarButton
                href={`/services?id=${category.id}`}
                label={category.name}
                categoryId={category.id}
              />
            </ItemStyled>
          ))}
        {dataSubMenu &&
          dataSubMenu.map((subMenu: any) => (
            <li key={subMenu.id}>
              <SideBarButton href={subMenu.href} label={subMenu.name} />
            </li>
          ))}
      </ListStyled>
    </AsideStyled>
  );
};

const AsideStyled = styled.aside`
  display: flex;
  flex-direction: column;
  min-width: 230px;
`;
const ListStyled = styled.ul`
  list-style: none;
`;
const ItemStyled = styled.li`
  &:not(:first-of-type) {
    margin-top: 10px;
  }
`;
