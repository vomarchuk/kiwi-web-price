'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'

interface IQueryProvider {
  children: ReactNode
}
export const QueryProvider: React.FC<IQueryProvider> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24,
            staleTime: 1000 * 60 * 15,
          },
        },
      }),
  )
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  )
}
