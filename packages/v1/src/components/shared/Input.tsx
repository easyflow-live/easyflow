import {
  InputGroup,
  InputRightElement,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { Spinner } from './Spinner';

export interface InputProps extends ChakraInputProps {
  isLoading?: boolean;
  isFullWidth?: boolean;
}

const Input = ({ isFullWidth = true, isLoading, ...props }: InputProps) => (
  <InputGroup>
    <ChakraInput
      position='relative'
      borderWidth='1px'
      borderColor='transparent'
      bg='gray.600'
      color='white'
      px={3}
      py={2}
      shadow='lg'
      width={isFullWidth && '100%'}
      _disabled={{ bg: 'gray.700', color: 'gray.900', cursor: 'not-allowed' }}
      _placeholder={{ color: 'gray.900' }}
      _focus={{
        borderColor: 'pink.500',
        zIndex: 1,
      }}
      {...props}
    />

    {isLoading && (
      <InputRightElement>
        <Spinner />
      </InputRightElement>
    )}
  </InputGroup>
);

export default Input;
