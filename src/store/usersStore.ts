import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  currentUser: null
}

export const usersStore = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
    logoutCurrentUser: (state) => {
      state.currentUser = null
    }
  }
})

export const { setCurrentUser, logoutCurrentUser } = usersStore.actions