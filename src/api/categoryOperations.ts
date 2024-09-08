import { collection, getDocs, query } from 'firebase/firestore'
import { firestore } from './firebase'

export const getAllCategories = async () => {
  try {
    const q = query(collection(firestore, 'categories'))
    const querySnapshot = await getDocs(q)
    const allCategories: any = []
    querySnapshot.forEach((doc) => {
      const category = doc.data()
      allCategories.push(category)
    })
    return allCategories
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}
