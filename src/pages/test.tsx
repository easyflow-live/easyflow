import { MultipleContainers } from 'components/shared/MultipleContainers';
import { createRange } from 'components/shared/MultipleContainers/helpers';
import NoSSR from 'components/shared/NoSSR';
import { observer } from 'mobx-react-lite';
import { useBoard } from 'modules/Board/hooks/use-board';
import { useEffect } from 'react';

const Test = () => {
  const [board] = useBoard('aYgwfKVJ3dEytZ6mHNTQ');

  useEffect(() => {
    console.log({ lists: board && board.lists.docs });
  }, [board]);

  return (
    <NoSSR>
      <MultipleContainers items={!board ? {} : { ...board.lists.docs }} />
    </NoSSR>
  );
};

export default observer(Test);
