import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore'
import { firestore } from './firebase'
import { store } from '@/store/store'
import { ServiceType } from '@/app/helpers/schemas'
export const getAllCategories = async () => {
  try {
    const q = query(collection(firestore, 'categories'))
    const querySnapshot = await getDocs(q)
    const allCategories: any = []
    querySnapshot.forEach((doc) => {
      const category = { ...doc.data(), id: doc.id }
      allCategories.push(category)
    })
    return allCategories
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

// export const addNewService = async (newItem: ServiceType) => {
//   try {
//     const itemRef = doc(firestore, 'services', newItem.id)
//     await setDoc(itemRef, newItem)
//     store.dispatch(addNewService(newItem))
//   } catch (error) {

//   }
// }

