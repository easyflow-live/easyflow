import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { Flex, FlexProps, HStack, Text, VStack } from '@chakra-ui/layout'
import { Loader } from 'src/client/shared/components/Loader'
import { useCurrentUserQuery } from 'src/types/generated'

function Container({ children, ...props }: WithChildren<FlexProps>) {
  return (
    <Flex
      direction="column"
      bg="gray.800"
      borderRadius={10}
      p={4}
      mt={1}
      {...props}
    >
      {children}
    </Flex>
  )
}

export function ProfileCard() {
  const { data, loading } = useCurrentUserQuery()

  if (loading) {
    return (
      <Container minHeight={300} justifyContent="center" alignItems="center">
        <Loader />
      </Container>
    )
  }

  if (!data?.currentUser) return null

  const { currentUser } = data

  return (
    <Container>
      <VStack alignItems="stretch" spacing={6}>
        <HStack alignItems="center" spacing={3}>
          <Avatar src={currentUser.image} size="lg" />

          <Flex direction="column">
            <Text>{currentUser.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {currentUser.username}
            </Text>
          </Flex>
        </HStack>

        <Button variant="outline">Follow</Button>

        <HStack justify="center" spacing={6}>
          <VStack spacing={0} align="center">
            <Text fontWeight={600}>23k</Text>
            <Text fontSize="sm" color="gray.500">
              Followers
            </Text>
          </VStack>

          <VStack spacing={0} align="center">
            <Text fontWeight={600}>23k</Text>
            <Text fontSize="sm" color="gray.500">
              Following
            </Text>
          </VStack>

          <VStack spacing={0} align="center">
            <Text fontWeight={600}>23k</Text>
            <Text fontSize="sm" color="gray.500">
              Stars
            </Text>
          </VStack>
        </HStack>

        <Text color="gray.500" align="left">
          {currentUser.description}
        </Text>
      </VStack>
    </Container>
  )
}
