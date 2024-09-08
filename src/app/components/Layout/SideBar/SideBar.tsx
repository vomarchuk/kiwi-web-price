import { getAllCategories } from '@/api/categoryOperations'
import { Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const SideBar = () => {
  const { data: dataCategory } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await getAllCategories(),
  })

  const router = useRouter()
  const redirect = () => router.push('/home/addcategories')
  return (
    <aside>
      <h2>TEXT</h2>
      <ul>
        {dataCategory &&
          dataCategory.map((category: any) => <li>{category.name}</li>)}
      </ul>
      <Button onClick={redirect}>add new category</Button>
    </aside>
  )
}
