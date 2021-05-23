import { Page } from 'src/client/shared/components/Page'
import { Users } from 'src/types/generated'
import { Boards } from '../../Board'

type ProfileProps = {
  user: Users
}

export function Profile({ user }: ProfileProps) {
  console.log({ user })

  return (
    <Page title="Profile">
      <Boards />
    </Page>
  )
}
