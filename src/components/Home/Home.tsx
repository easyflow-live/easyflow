import React from 'react';
import { Title } from 'react-head';
import { observer } from 'mobx-react-lite';

import UserDocument from 'documents/user.doc';
import Heading from 'components/shared/Heading';
import { Boards } from 'components/Board/Boards';

const Home = ({ userDoc }: { userDoc: UserDocument }) => {
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
