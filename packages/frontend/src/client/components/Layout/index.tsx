import { PropsWithChildren } from 'react'
import { Navbar } from 'client/components/Navbar'

export function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
