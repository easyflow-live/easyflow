import { Box, Flex, FlexProps } from '@chakra-ui/layout'
import React from 'react'

const gridTemplateColumns = {
  md: '280px auto',
  lg: '280px auto',
  '2lg': '280px 640px 220px',
  xl: '280px 640px 320px',
}

const display = { base: 'flex', md: 'grid' }
const width = { base: 'full', '2lg': 'auto' }

export const MainGrid = ({ children }: WithChildren) => {
  return (
    <Box
      display={display}
      width={width}
      gridColumnGap={5}
      gridTemplateColumns={gridTemplateColumns}
      paddingTop={4}
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
      pl={4}
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
      {...props}
      pr={4}
      pl={{ base: 4, md: 0 }}
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
      {...props}
    >
      {children}
    </Flex>
  )
}
