import { Flex } from '@chakra-ui/layout'
import { MainGrid } from './MainGrid'
import {
  MainGridLeftColumn,
  MainGridRightColumn,
  MainGridMiddleColumn,
} from './MainGrid'

export function Layout({ children }: WithChildren) {
  return (
    <Flex justifyContent="center">
      <MainGrid>{children}</MainGrid>
    </Flex>
  )
}

Layout.LeftColumn = MainGridLeftColumn
Layout.MiddleColumn = MainGridMiddleColumn
Layout.RightColumn = MainGridRightColumn
