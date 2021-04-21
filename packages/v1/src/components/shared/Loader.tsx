import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.47058823529411764);
  opacity: 0.8;
  z-index: 1;

  &::before {
    content: '';
    width: 3rem;
    height: 3rem;
    border: 0.5rem solid rgba(255, 255, 255, 0.4);
    border-right-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -1rem;
    margin-left: -1rem;
    animation: ${rotate} 2s linear infinite;
  }

  &::after {
    content: 'We are loading your content...';
    color: white;
    position: absolute;
    top: 55%;
    left: calc(50% - 100px);
  }
`;

export default Loader;
