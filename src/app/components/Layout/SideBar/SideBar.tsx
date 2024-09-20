import { useQuery } from '@tanstack/react-query';
import { SideBarButton } from '../../Buttons/SideBarButton';
import { fetchItems } from '@/api/firebaseFunctions';
// import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
export const SideBar = () => {
  // const dispatch = useDispatch();
  const { data: dataCategory } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await fetchItems('categories'),
  });
  const { data: dataSubMenu } = useQuery({
    queryKey: ['subMenu'],
    queryFn: async () => await fetchItems('subMenu'),
  });
  //

  // useEffect(() => {
  //   dispatch(setCategories(dataCategory));
  // }, [dataCategory]);
  return (
    <AsideStyled>
      <ListStyled>
        {dataCategory &&
          dataCategory.map((category: any) => (
            <ItemStyled key={category.id}>
              <SideBarButton
                href={`/services?id=${category.id}`}
                label={category.name}
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
  width: 260px;
`;
const ListStyled = styled.ul`
  list-style: none;
`;
const ItemStyled = styled.li`
  &:not(:first-child) {
    margin-top: 10px;
  }
`;
