'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from './ThemeProvider'
import { Toaster } from '@/components/ui/Toaster'

const client = new QueryClient()

export function AppProviders({ children }: WithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  )
}
