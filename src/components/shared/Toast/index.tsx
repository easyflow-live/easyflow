import { CloseButton, Flex, Text } from '@chakra-ui/react';
import Button from '../Button';

interface ToastProps {
  title: string;
  id: string | number;
  isClosable?: boolean;
  undo?: (id: string | number) => void;
  closeToast?: () => void;
  onCloseComplete?: () => void;
}

const Toast = ({
  title,
  id,
  isClosable = true,
  undo,
  closeToast,
  onCloseComplete,
}: ToastProps) => {
  const handleUndo = () => {
    undo(id);
    closeToast();
  };

  const handleClose = () => {
    closeToast();
    onCloseComplete?.();
  };

  return (
    <Flex flexDirection='column'>
      <Flex
        alignItems='center'
        borderRadius='0.5rem'
        bg='gray.800'
        p={4}
        id={`undo-toast-${id}`}
      >
        <Text mr={4} color='gray.300' flex={1}>
          {title}{' '}
        </Text>

        {undo && (
          <Button
            className='mr-4 ml-2'
            onClick={handleUndo}
            variant='ghost'
            size='small'
          >
            Undo
          </Button>
        )}

        {isClosable && (
          <CloseButton
            onClick={handleClose}
            color='gray.400'
            _hover={{ bg: 'gray.600' }}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Toast;
