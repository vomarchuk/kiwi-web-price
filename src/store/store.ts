import { configureStore } from "@reduxjs/toolkit";
import { categoriesStore } from "./categoriesStore";
import { usersStore } from "./usersStore";

export const store = configureStore({
  reducer: {
    categoriesStore: categoriesStore.reducer,
    usersStore: usersStore.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch