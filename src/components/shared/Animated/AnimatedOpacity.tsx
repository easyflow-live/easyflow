import { ReactChild } from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { chakra, ChakraProps } from '@chakra-ui/system';

const MotionDiv = chakra(motion.div);

type AnitedOpacityProps = {
  show: boolean;
  children: ReactChild;
} & ChakraProps &
  HTMLMotionProps<'div'>;

export const AnimatedOpacity = ({
  show,
  children,
  ...props
}: AnitedOpacityProps) => {
  return (
    <MotionDiv
      animate={{ opacity: show ? 1 : 0 }}
      initial={{ opacity: 0 }}
      {...props}
    >
      {children}
    </MotionDiv>
  );
};
