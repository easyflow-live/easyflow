import { Boards } from 'src/client/modules/Board'
import { Page } from 'src/client/shared/components/Page'

function Index() {
  return (
    <Page title="Home">
      <Boards />
    </Page>
  )
}

export default Index
