import styled from 'styled-components';

const CardOptionButton = styled.button`
  display: flex;
  align-items: center;
  height: 33px;
  margin: 0 3px 4px 3px;
  padding: 0 6px;
  border: 0;
  border-radius: 3px;
  color: #fff;
  background: transparent;
  font-size: inherit;
  cursor: pointer;

  &:hover,
  &:focus {
    color: #ed64a6;
  }
`;

export default CardOptionButton;
