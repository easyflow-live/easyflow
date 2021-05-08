import { Flex, FlexProps } from '@chakra-ui/layout'

export function MiddleColumn({ children, ...props }: WithChildren<FlexProps>) {
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
