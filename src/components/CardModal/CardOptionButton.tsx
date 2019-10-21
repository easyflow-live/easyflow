import styled from 'styled-components';

const CardOptionButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  border: 0;
  padding: 0.75rem;
  background: transparent;
  font-size: inherit;
  cursor: pointer;
  min-width: 100%;

  &:hover,
  &:focus {
    background-color: #2d3748;
  }
`;

export default CardOptionButton;
