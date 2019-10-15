import styled from 'styled-components';

const StyledInput = styled.input`
  &::placeholder {
    color: #1a202c; // bg-gray-900
  }
`;

const Input = props => (
  <StyledInput
    className='bg-gray-600 shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight'
    {...props}
  />
);

export default Input;
