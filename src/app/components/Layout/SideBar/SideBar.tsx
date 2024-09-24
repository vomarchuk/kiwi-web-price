import { useQuery } from '@tanstack/react-query';
import { SideBarButton } from '../../Buttons/SideBarButton';
import { fetchItems } from '@/api/firebaseFunctions';
import styled from '@emotion/styled';
export const SideBar = () => {
  const { data: dataCategory } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await fetchItems('categories'),
  });
  const { data: dataSubMenu } = useQuery({
    queryKey: ['subMenu'],
    queryFn: async () => await fetchItems('subMenu'),
  });

  return (
    <AsideStyled>
      <ListStyled>
        {dataCategory &&
          dataCategory.map((category: any) => (
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
              <SideBarButton
                href={subMenu.href}
                label={subMenu.name}
                // categoryId={category.id}
              />
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
