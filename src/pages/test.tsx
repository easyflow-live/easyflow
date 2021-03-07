import {
  MultipleContainers,
  defaultContainerStyle,
} from 'components/shared/MultipleContainers';
import NoSSR from 'components/shared/NoSSR';

const Test = () => {
  return (
    <NoSSR>
      <MultipleContainers
        getContainerStyle={args => ({
          ...defaultContainerStyle(args),
          maxHeight: '80vh',
          overflowY: 'auto',
        })}
      />
    </NoSSR>
  );
};

export default Test;
