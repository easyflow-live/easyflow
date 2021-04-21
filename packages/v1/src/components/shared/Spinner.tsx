import { FaSpinner } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const AnimatedSpinner = styled.span`
  animation: ${rotate} 2s linear infinite;
`;

interface SpinnerProps {
  size?: string;
  color?: string;
  className?: string;
}

export const Spinner = ({
  className,
  size = '18',
  color = '#fff',
}: SpinnerProps) => (
  <AnimatedSpinner className={className}>
    <FaSpinner size={size} color={color} />
  </AnimatedSpinner>
);
