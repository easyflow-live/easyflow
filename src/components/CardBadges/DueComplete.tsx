import Checkbox from '../Checkbox/Checkbox';
import styled from 'styled-components';

interface DueCompleteProps {
  id: string;
  completed: boolean;
  onComplete: (completed: boolean) => void;
}

const DueComplete = ({ id, completed, onComplete }: DueCompleteProps) => (
  <Container className='DueComplete'>
    <Checkbox
      containerStyle={{
        backgroundColor: 'hsla(0, 0%, 3.5%, 0.1)',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      label='Done'
      id={`due-complete-${id}`}
      checked={completed}
      onChange={e => onComplete(e.target.checked)}
    />
  </Container>
);

export default DueComplete;

const Container = styled.div`
  display: none;
`;
