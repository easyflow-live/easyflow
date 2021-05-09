import { ReactNode } from 'react'
import Image from 'next/image'
import { Flex, Text, VStack } from '@chakra-ui/layout'
interface EmptyProps {
  image: string | ReactNode
  message: string
  button?: ReactNode
}

export const Empty = ({ image, message, button }: EmptyProps) => (
  <VStack spacing={6} justifyContent="center" alignItems="center" height="full">
    {typeof image === 'string' ? (
      <Image src={image} width={300} height={213} />
    ) : (
      image
    )}

    <Text as="h3" color="white" fontSize="xl">
      {message}
    </Text>
    {button}
  </VStack>
)
