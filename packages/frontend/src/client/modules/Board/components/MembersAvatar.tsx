import {
  Flex,
  Avatar,
  HStack,
  Text,
  Button,
  useDisclosure,
  FlexProps,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import { MdPersonAdd } from 'react-icons/md'
import { User } from '../domain/types'
import { BoardMemberAvatar } from './BoardMemberAvatar'
import { HoverCard } from './HoverCard'

function FakeMember({ children, ...props }: WithChildren<FlexProps>) {
  return (
    <Flex
      bg="gray.700"
      borderRadius="full"
      boxSize="30px"
      justifyContent="center"
      alignItems="center"
      color="gray.500"
      marginLeft="-2"
      zIndex={1}
      {...props}
    >
      {children}
    </Flex>
  )
}

type MemberAvatarProps = {
  member: User
}

function MemberAvatar({ member }: MemberAvatarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure({ isOpen: false })
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const handleClose = () => {
    // @ts-ignore
    clearTimeout(openTimeoutRef.current)

    closeTimeoutRef.current = setTimeout(() => {
      onClose()
    }, 50)
  }

  const handleOpen = () => {
    // @ts-ignore
    clearTimeout(closeTimeoutRef.current)

    openTimeoutRef.current = setTimeout(() => {
      onOpen()
    }, 150)
  }

  return (
    <HoverCard isOpen={isOpen} onOpen={handleOpen} onClose={handleClose}>
      <HoverCard.Trigger>
        <BoardMemberAvatar
          hover={true}
          onMouseOver={handleOpen}
          onMouseOut={handleClose}
          key={member.id}
          marginLeft="-2"
          src={member.image}
          title={member.username}
        />
      </HoverCard.Trigger>

      <HoverCard.Content>
        <HoverCard.Body>
          <HStack alignItems="center" spacing={3}>
            <Avatar src={member.image} size="lg" />

            <Flex direction="column">
              <Text>{member.username}</Text>
              <Text fontSize="sm" color="gray.500">
                {member.username}
              </Text>
            </Flex>
          </HStack>
        </HoverCard.Body>

        <HoverCard.Footer>
          <Button size="sm" variant="outline">
            Follow
          </Button>
        </HoverCard.Footer>
      </HoverCard.Content>
    </HoverCard>
  )
}

type MembersAtavarProps = {
  members: User[]
}

const totalToList = 3

export function MembersAtavar({ members }: MembersAtavarProps) {
  const membersRemain = members.length - totalToList
  const remain = membersRemain > 0

  return (
    <Flex>
      {members.slice(0, totalToList).map((member) => (
        <MemberAvatar key={member.id} member={member} />
      ))}

      {remain ? <FakeMember>+{membersRemain}</FakeMember> : null}

      <FakeMember marginLeft={remain ? '3' : '0px'}>
        <MdPersonAdd />
      </FakeMember>
    </Flex>
  )
}
