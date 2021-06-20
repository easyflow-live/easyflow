import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverFooter,
  PopoverBodyProps,
  Portal,
} from '@chakra-ui/react';
import React, { createContext, useContext } from 'react';

type HoverCardContextValue = {
  onClose: () => void;
  onOpen: () => void;
};

const HoverCardContext = createContext<HoverCardContextValue | undefined>(
  undefined
);

type HoverCardProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

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
        placement='top'
        closeOnBlur={false}
        autoFocus={false}
      >
        {children}
      </Popover>
    </HoverCardContext.Provider>
  );
}

function Trigger(props: WithChildren) {
  return <PopoverTrigger {...props} />;
}

function Content({ children }: WithChildren) {
  const { onOpen, onClose } = useContext(HoverCardContext);

  return (
    <Portal>
      <PopoverContent
        onMouseOver={onOpen}
        onMouseOut={onClose}
        border={0}
        bg='gray.800'
      >
        <PopoverArrow
          bg='gray.800'
          style={{ boxShadow: 'var(--chakra-shadows-sm)' }}
        />
        {children}
      </PopoverContent>
    </Portal>
  );
}

function Body(props: WithChildren<PopoverBodyProps>) {
  return <PopoverBody {...props} />;
}

function Footer({ children }: WithChildren) {
  return (
    <PopoverFooter d='flex' justifyContent='flex-start'>
      {children}
    </PopoverFooter>
  );
}

HoverCard.Trigger = Trigger;
HoverCard.Content = Content;
HoverCard.Body = Body;
HoverCard.Footer = Footer;
