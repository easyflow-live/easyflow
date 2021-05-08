import { Flex, FlexProps } from '@chakra-ui/layout'

export function BasicHeader({ children, ...props }: WithChildren<FlexProps>) {
  return (
    <Flex height="50px" width="full" {...props}>
      {children}
    </Flex>
  )
}
