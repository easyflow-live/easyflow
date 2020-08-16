import React from 'react';
import { Title } from 'react-head';
import { observer } from 'mobx-react-lite';

import Heading from 'components/shared/Heading';
import Boards from 'modules/Dashboard';
import { useSession } from 'hooks/use-session';

const Home = () => {
  const { userDoc } = useSession();

  if (!userDoc) return null;

  return (
    <>
      <Title>Boards | Easy Flow</Title>

      <div className='m-6'>
        <Heading text={'Boards'} />
        <Boards boards={userDoc.boards} />
      </div>
    </>
  );
};

export default observer(Home);
