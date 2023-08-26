import { Metadata } from 'next'
import { Boards } from '@/modules/Dashboard/Boards'
import { createSupabaseServerComponentClient } from '@/libs/supabase/supabase-server'

export const metadata: Metadata = {
  title: 'Dashboard | EasyFlow',
}

export default async function DashboardPage() {
  const supabase = createSupabaseServerComponentClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return <Boards userId={session?.user.id} />
}
