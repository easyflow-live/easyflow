import { Avatar, AvatarProps } from '@chakra-ui/avatar'
import { forwardRef } from 'react'

type HoverableAvatarProps = {
  hover: boolean
} & AvatarProps

export const BoardMemberAvatar = forwardRef<
  HTMLSpanElement,
  HoverableAvatarProps
>(({ hover, ...props }, ref) => {
  return (
    <Avatar
      ref={ref}
      borderColor="gray.700"
      borderRadius="full"
      borderWidth={1}
      size="sm"
      translate={hover ? 'yes' : 'no'}
      {...props}
    />
  )
})
