import { Box, Flex, FlexProps } from '@chakra-ui/layout'
import React from 'react'

const gridTemplateColumns = {
  md: '87px 600px 64px',
  lg: '235px 610px 64px',
  '2lg': '235px 640px 125px',
  xl: '235px 640px 325px',
}

const display = { base: 'flex', md: 'grid' }
const width = { base: 'full', md: 'auto' }

export const MainGrid = ({ children }: WithChildren) => {
  return (
    <Box
      display={display}
      width={width}
      gridColumnGap={5}
      gridTemplateColumns={gridTemplateColumns}
    >
      {children}
    </Box>
  )
}

export function MainGridLeftColumn({
  children,
  ...props
}: WithChildren<FlexProps>) {
  return (
    <Flex
      position="sticky"
      top={0}
      height="full"
      flex="1 1 0%"
      direction="column"
      paddingTop={1}
      {...props}
    >
      {children}
    </Flex>
  )
}

export function MainGridMiddleColumn({
  children,
  ...props
}: WithChildren<FlexProps>) {
  return (
    <Flex
      height="full"
      flex="1 1 0%"
      direction="column"
      paddingTop={1}
      {...props}
    >
      {children}
    </Flex>
  )
}

export function MainGridRightColumn({
  children,
  ...props
}: WithChildren<FlexProps>) {
  return (
    <Flex
      position="sticky"
      top={0}
      height="full"
      flex="1 1 0%"
      direction="column"
      paddingTop={1}
      {...props}
    >
      {children}
    </Flex>
  )
}
