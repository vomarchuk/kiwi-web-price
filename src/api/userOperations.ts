'use client'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc } from 'firebase/firestore'

import { auth } from './firebase'
import { firestore } from './firebase'
import { UserType } from "@/app/helpers/schemas"

export const fetchUserData = async (userId: string) => {
  const usersDocRef = doc(firestore, 'users', userId)
  const userData = (await getDoc(usersDocRef)).data() as UserType
  return userData
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
      // const userData = await fetchUserData(user.uid)
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
    }, reject);
  });
};
checkForUser()