import { Flex } from '@chakra-ui/layout'
import { BasicHeader } from './BasicHeader'
import { UserMenu } from './UserMenu'

const responsiveRisplay = { base: 'block', '2lg': 'none' }

export function MiddleHeader() {
  return (
    <BasicHeader>
      <Flex width="full" justifyContent="flex-end">
        <Flex display={responsiveRisplay}>
          <UserMenu />
        </Flex>
      </Flex>
    </BasicHeader>
  )
}
