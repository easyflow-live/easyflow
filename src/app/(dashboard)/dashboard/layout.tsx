import { DashboardHeader } from './_components/DashboardHeader'

export default async function DashboardLayout({ children }: WithChildren) {
  return (
    <>
      <DashboardHeader />

      {children}
    </>
  )
}
