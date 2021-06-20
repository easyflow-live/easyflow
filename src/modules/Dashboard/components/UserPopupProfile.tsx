import { Flex, Avatar, FlexProps, AvatarProps, chakra } from '@chakra-ui/react';
import { HoverCard } from 'components/shared/HoverCard';
import { motion } from 'framer-motion';
import React, { forwardRef, MouseEvent, useRef, useState } from 'react';
import { MdPersonAdd } from 'react-icons/md';
import { User } from 'store/users';
import { UserSimpleProfileCard } from './UserSimpleProfileCard';

const MotionSpan = chakra(motion.span);

type BoardMemberAvatarProps = AvatarProps & {
  onHover: boolean;
};

export const BoardMemberAvatar = forwardRef<
  HTMLSpanElement,
  BoardMemberAvatarProps
>(({ onHover, ...props }, ref) => {
  return (
    <MotionSpan
      ref={ref}
      animate={{ y: onHover ? -3 : 0, zIndex: onHover ? 2 : 0 }}
    >
      <Avatar
        borderColor='gray.700'
        borderRadius='full'
        borderWidth={1}
        size='sm'
        {...props}
      />
    </MotionSpan>
  );
});

function FakeMember({ children, ...props }: WithChildren<FlexProps>) {
  return (
    <Flex
      bg='gray.700'
      borderRadius='full'
      boxSize='30px'
      justifyContent='center'
      alignItems='center'
      color='gray.500'
      marginLeft='-2'
      zIndex={1}
      cursor='default'
      {...props}
    >
      {children}
    </Flex>
  );
}

type MemberAvatarProps = {
  member: User;
};

function MemberAvatar({ member }: MemberAvatarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const openTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleClose = () => {
    // @ts-ignore
    clearTimeout(openTimeoutRef.current);

    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 50);
  };

  const handleOpen = () => {
    // @ts-ignore
    clearTimeout(closeTimeoutRef.current);

    openTimeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 150);
  };

  return (
    <HoverCard isOpen={isOpen} onOpen={handleOpen} onClose={handleClose}>
      <HoverCard.Trigger>
        <BoardMemberAvatar
          onHover={isOpen}
          onMouseOver={handleOpen}
          onMouseOut={handleClose}
          key={member.id}
          src={member.photo}
          title={member.username}
          marginLeft='-2'
          cursor='default'
        />
      </HoverCard.Trigger>

      <HoverCard.Content>
        <HoverCard.Body cursor='default'>
          <UserSimpleProfileCard
            username={member.username}
            photo={member.photo}
            email={member.email}
          />
        </HoverCard.Body>
      </HoverCard.Content>
    </HoverCard>
  );
}

type MembersAtavarProps = {
  members: User[];
  onAddMemberClick?: () => void;
};

const totalToList = 5;

export function MembersAtavar({
  members,
  onAddMemberClick,
}: MembersAtavarProps) {
  const membersRemain = members.length - totalToList;
  const remain = membersRemain > 0;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onAddMemberClick();
  };

  return (
    <Flex pl={2}>
      {members.slice(0, totalToList).map((member) => (
        <MemberAvatar key={member.id} member={member} />
      ))}

      {remain ? <FakeMember>+{membersRemain}</FakeMember> : null}

      {onAddMemberClick && (
        <FakeMember ml={members.length > 0 ? 2 : '0px'} onClick={handleClick}>
          <MdPersonAdd />
        </FakeMember>
      )}
    </Flex>
  );
}
