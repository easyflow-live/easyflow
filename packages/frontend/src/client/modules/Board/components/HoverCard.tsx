import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverFooter,
} from '@chakra-ui/react'
import React, { createContext, useContext } from 'react'

type ContextProps = {
  onClose: () => void
  onOpen: () => void
}

const HoverCardContext = createContext<ContextProps>({
  onClose: () => null,
  onOpen: () => null,
})

type HoverCardProps = {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export function HoverCard({
  isOpen,
  onClose,
  onOpen,
  children,
}: WithChildren<HoverCardProps>) {
  return (
    <HoverCardContext.Provider value={{ onOpen, onClose }}>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement="top"
        closeOnBlur={false}
      >
        {children}
      </Popover>
    </HoverCardContext.Provider>
  )
}

function Trigger({ children }: WithChildren) {
  return <PopoverTrigger>{children}</PopoverTrigger>
}

function Content({ children }: WithChildren) {
  const { onOpen, onClose } = useContext(HoverCardContext)

  return (
    <PopoverContent onMouseOver={onOpen} onMouseOut={onClose} border={0}>
      <PopoverArrow />
      {children}
    </PopoverContent>
  )
}

function Body({ children }: WithChildren) {
  return <PopoverBody>{children}</PopoverBody>
}

function Footer({ children }: WithChildren) {
  return (
    <PopoverFooter d="flex" justifyContent="flex-start">
      {children}
    </PopoverFooter>
  )
}

HoverCard.Trigger = Trigger
HoverCard.Content = Content
HoverCard.Body = Body
HoverCard.Footer = Footer
