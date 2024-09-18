import { useQuery } from '@tanstack/react-query'
import { SideBarButton } from '../../Buttons/SideBarButton'
import { fetchItems } from '@/api/firebaseFunctions'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setCategories } from '@/store/categoriesStore'

const dataCategories = [
  {
    id: '1',
    name: '1 Projects',
    href: 'contact',
  },
  {
    id: '2',
    name: '2 Projects',
    href: 'contact',
  },
]

export const SideBar = () => {
  const dispatch = useDispatch()
  const { data: dataCategory } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await fetchItems('categories'),
  })
  const { data: dataSubMenu } = useQuery({
    queryKey: ['subMenu'],
    queryFn: async () => await fetchItems('subMenu'),
  })
  useEffect(() => {
    dispatch(setCategories(dataCategory))
  }, [dataCategory])
  return (
    <aside className="flex flex-col">
      {/* <h2>TEXT</h2> */}
      <ul className="w-[250px]">
        <li>
          <SideBarButton href="aboutUs" label="aboutUs" />
        </li>
        {dataCategory &&
          dataCategory.map((category: any) => (
            <li className="mt-[10px]">
              <SideBarButton href={category.name} label={category.name} />
            </li>
          ))}
        {dataCategories &&
          dataCategories.map((subMenu: any) => (
            <li className="mt-[10px]">
              <SideBarButton href={subMenu.href} label={subMenu.name} />
            </li>
          ))}
      </ul>
    </aside>
  )
}
