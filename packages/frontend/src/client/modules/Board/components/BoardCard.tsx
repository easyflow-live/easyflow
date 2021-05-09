import { Flex, Text } from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/tag'

export type Visibility = 'public' | 'private'

type BoardCardProps = {
  name: string
  projectName: string
  visibility: Visibility
}

export function BoardCard({
  name,
  projectName,
  visibility = 'public',
}: BoardCardProps) {
  return (
    <Flex direction="column" borderRadius={10} bg="gray.800" p={4}>
      <Flex justifyContent="space-between">
        <Flex direction="column">
          <Text fontWeight="bold" fontSize="lg">
            {name}
          </Text>
          <Text>{projectName}</Text>
        </Flex>
      </Flex>

      <Flex justifyContent="flex-end">
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
    </Flex>
  )
}
