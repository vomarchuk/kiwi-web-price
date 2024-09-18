import { configureStore } from "@reduxjs/toolkit";
import { categoriesStore } from "./categoriesStore";

export const store = configureStore({
  reducer: {
    categoriesStore: categoriesStore.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch