import { useQuery } from '@tanstack/react-query';
import { SideBarButton } from '../../Buttons/SideBarButton';
import { fetchItems } from '@/api/firebaseFunctions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCategories } from '@/store/categoriesStore';
// Example of linking to a dynamic route from another page
import Link from 'next/link';

export const SideBar = () => {
  const dispatch = useDispatch();
  const { data: dataCategory } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await fetchItems('categories'),
  });
  const { data: dataSubMenu } = useQuery({
    queryKey: ['subMenu'],
    queryFn: async () => await fetchItems('subMenu'),
  });
  //

  useEffect(() => {
    dispatch(setCategories(dataCategory));
  }, [dataCategory]);
  return (
    <aside
    // className="flex flex-col"
    >
      {/* <h2>TEXT</h2> */}
      <ul
      // className="w-[250px]"
      >
        <Link href="/home/services/your-dynamic-slug">
          <p>Go to Dynamic Route</p>
        </Link>

        {dataCategory &&
          dataCategory.map((category: any) => (
            <li>
              <SideBarButton href={category.name} label={category.name} />
            </li>
          ))}
        {dataSubMenu &&
          dataSubMenu.map((subMenu: any) => (
            <li>
              <SideBarButton href={subMenu.href} label={subMenu.name} />
            </li>
          ))}
      </ul>
    </aside>
  );
};
