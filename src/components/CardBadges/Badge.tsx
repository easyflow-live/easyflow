import styled from 'styled-components';

const Badge = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
  padding: 3px 4px 1px 3px;
  border-radius: 4px;
  color: white;
  transition: background 0.15s;

  & .badge-icon {
    margin-bottom: 2px;
  }
`;

export default Badge;
