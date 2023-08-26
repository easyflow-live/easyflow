import { cookies } from 'next/headers'
import { Sidebar } from '@/components/Sidebar'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/libs/database.types'
import { redirect } from 'next/navigation'

export default async function RootDashboardLayout({ children }: WithChildren) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <AuthProvider session={session}>
      <div className="flex">
        <Sidebar session={session} />
        <main className="flex-1">{children}</main>
      </div>
    </AuthProvider>
  )
}
