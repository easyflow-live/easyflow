import { AppProviders } from '@/components/providers/AppProviders'

import '@/styles/style.css'

export default function RootLayout({ children }: WithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-gray-800 antialiased">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
