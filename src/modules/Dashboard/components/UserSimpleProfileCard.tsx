import { Flex, HStack, Text, Avatar } from '@chakra-ui/react';

type UserSimpleProfileCardProps = {
  username: string;
  photo: string;
  email: string;
};

export function UserSimpleProfileCard({
  username,
  photo,
  email,
}: UserSimpleProfileCardProps) {
  return (
    <HStack alignItems='center' spacing={3} p={2}>
      <Avatar src={photo} size='lg' />

      <Flex direction='column'>
        <Text>{username}</Text>
        <Text fontSize='sm' color='gray.500'>
          {email}
        </Text>
      </Flex>
    </HStack>
  );
}
