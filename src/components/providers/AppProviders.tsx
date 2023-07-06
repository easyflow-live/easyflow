'use client'

import { HeadProvider } from 'react-head'

export function AppProviders({ children }: WithChildren) {
  return <HeadProvider headTags={[]}>{children}</HeadProvider>
}
