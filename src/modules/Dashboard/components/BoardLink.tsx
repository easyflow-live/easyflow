import { Text } from '@chakra-ui/layout';
import { chakra } from '@chakra-ui/system';
import { motion } from 'framer-motion';
import Link from 'next/link';

type BoardLinkProps = {
  title: string;
  id: string;
};

const MotionAnchor = chakra(motion.a);

export function BoardLink({ title, id }: BoardLinkProps) {
  return (
    <Link href={'/b/[uid]'} as={`/b/${id}`}>
      <MotionAnchor
        title={title}
        animate={{ x: 0, opacity: 1 }}
        bg='gray.700'
        borderRadius='lg'
        cursor='pointer'
        shadow='lg'
        p={4}
        ml={0}
        mr={4}
        mb={4}
        w={{ base: 'full', md: 48 }}
        h={32}
        wordBreak='break-word'
        initial={{ x: -50, opacity: 0 }}
        transition='background 0.3s'
        _hover={{ backgroundColor: 'gray.600' }}
      >
        <Text color='white' fontWeight='bold' fontSize='lg'>
          {title}
        </Text>
      </MotionAnchor>
    </Link>
  );
}
