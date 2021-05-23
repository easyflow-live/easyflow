import { Flex, Text, VStack } from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/tag'
import { User } from '../domain/types'
import { MembersAtavar } from './MembersAvatar'

export type Visibility = 'public' | 'private'

type BoardCardProps = {
  name: string
  projectName: string
  members: User[]
  visibility: Visibility
}

export function BoardCard({
  name,
  projectName,
  members = [],
  visibility = 'public',
}: BoardCardProps) {
  return (
    <VStack
      spacing={4}
      alignItems="stretch"
      borderRadius={10}
      bg="gray.800"
      p={4}
    >
      <Flex justifyContent="space-between">
        <Flex direction="column">
          <Text fontWeight="bold" fontSize="lg">
            {name}
          </Text>
          <Text>{projectName}</Text>
        </Flex>
      </Flex>

      <Flex justifyContent="space-between">
        <MembersAtavar members={members} />

        {
          {
            public: (
              <Tag size="sm" variant="solid" colorScheme="pink">
                public
              </Tag>
            ),
            private: (
              <Tag size="sm" variant="solid" colorScheme="green">
                private
              </Tag>
            ),
          }[visibility]
        }
      </Flex>
    </VStack>
  )
}
