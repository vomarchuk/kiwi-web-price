
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: []
}

export const categoriesStore = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<any>) => {
      state.categories = action.payload
    }
  }
})

export const { setCategories } = categoriesStore.actions