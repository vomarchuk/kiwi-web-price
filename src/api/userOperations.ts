'use client'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendSignInLinkToEmail, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
// import { userSchema, UserType } from "@/helpers/schemas"
// import { cleanCategories } from "@/store/categoriesStore"
// import { cleanOrders } from "@/store/ordersStore"
// import { cleanProducts } from "@/store/productsStore"
// import { cleanSuppliers } from "@/store/suppliersStore"
import { store } from '../store/store'
import { logoutCurrentUser, setCurrentUser } from "../store/usersStore"
import { auth } from './firebase'
import { firestore } from './firebase'

export const fetchUserData = async (userId: string) => {
  const usersDocRef = doc(firestore, 'users', userId)
  const userData = (await getDoc(usersDocRef)).data() as any
  return userData
}

// export const createNewUser = async (newUser: UserType) => {
//   try {
//     const redirectUrl = ${ window.location.origin }/signup?email=${newUser.email}
//     userSchema.parse(newUser)
//     const actionCodeSettings = {
//       url: redirectUrl,
//       handleCodeInApp: true,
//     };
//     await sendSignInLinkToEmail(auth, newUser.email, actionCodeSettings);
//     console.log('Zaproszenie zostało wysłane.');
//     const usersRef = doc(firestore, 'users', newUser.id)
//     await setDoc(usersRef, newUser)
//     store.dispatch(addNewUser(newUser))
//   } catch (error: any) {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.error(Błąd: ${ errorCode } - ${ errorMessage });
//   }
// }
export const getAllUsersByRestaurantId = async (restaurantId: string) => {
  try {
    const q = query(collection(firestore, 'users'), where('restaurantsIds', 'array-contains', restaurantId))
    const querySnapshot = await getDocs(q)
    const allUsers: any = []
    querySnapshot.forEach((doc) => {
      const user = { ...doc.data() as any }
      allUsers.push(user)
    })
    return allUsers
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const signUpWithEmail = async (
  email: string,
  password: string,
  setLoginErrors: (n: string) => void,
  setIsLoggedIn: (n: boolean) => void
) => {
  try {
    const usersCollection = collection(firestore, 'users');
    const q = query(usersCollection);
    const querySnapshot = await getDocs(q)
    let getValidUser: any
    querySnapshot.forEach((doc) => {
      const user = doc.data() as any
      if (user.email === email) getValidUser = user
    })
    if (getValidUser) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const newUser = userCredential.user
      const oldDocRef = doc(firestore, 'users', getValidUser.id);
      const newDocRef = doc(firestore, 'users', newUser.uid);
      getValidUser.id = newUser.uid
      await setDoc(newDocRef, getValidUser);
      await deleteDoc(oldDocRef);
      const token = await newUser.getIdToken()
      localStorage.setItem('token', token)
      const userData = await fetchUserData(newUser.uid)
      localStorage.setItem('currentRestaurantId', userData.restaurantsIds[0])
      store.dispatch(setCurrentUser(userData))
      setIsLoggedIn(true)
    } else {
      throw new Error('auth/register-is-denied')
    }
  } catch (error: any) {
    if (!error.code) error.code = error.message
    switch (error.code) {
      case 'auth/email-already-in-use':
        setLoginErrors('Email already in use');
        break
      case 'auth/register-is-denied':
        setLoginErrors('Ups... wychodzi na to, że nie masz uprawnień do rejestracji');
        break
    }
  }
}

export const signInWithEmail = (
  email: string,
  password: string,
  setLoginErrors: (n: string) => void,
  setIsLoggedIn: (n: boolean) => void
) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then(async ({ user }) => {
      const token = await user.getIdToken()
      localStorage.setItem('token', token)
      const userData = await fetchUserData(user.uid)
      console.log('hello');

      store.dispatch(setCurrentUser(userData))
      setIsLoggedIn(true)
    })
    .catch(({ code }) => {
      switch (code) {
        case 'auth/user-not-found':
          setLoginErrors('Invalid login or password')
          break
        case 'auth/wrong-password':
          setLoginErrors('Invalid login or password')
          break
        case 'auth/network-request-failed':
          setLoginErrors('Network connection issue during authentication')
          break
        case 'auth/too-many-requests':
          setLoginErrors('Too many login attempts in a short period, the account has been locked.')
          break
        case 'auth/user-disabled':
          setLoginErrors('User account has been disabled by the administrator')
          break
        case 'auth/invalid-credential':
          setLoginErrors('The provided authentication credentials are incorrect')
          break
        default:
          setLoginErrors('Oops... something went wrong.')
      }
    })
}

export const logoutUser = async (setIsLogout: (n: boolean) => void) => {
  try {
    const storedToken = localStorage.getItem('token')
    if (!storedToken) throw new Error("Error while removing the token from storage")
    const auth = getAuth()
    await signOut(auth)
    localStorage.removeItem('token')
    localStorage.removeItem('currentRestaurantId')
    store.dispatch(logoutCurrentUser())
    setIsLogout(true)
  } catch (error) {
    console.error('Error during logging out from Firebase:', error)
    throw error
  }
}

const checkForUser = () => {
  return new Promise((_, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if (user) fetchUserData(user.uid).then(user => store.dispatch(setCurrentUser(user)))
    }, reject);
  });
};
checkForUser()