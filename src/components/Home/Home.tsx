import React from 'react';
import { Title } from 'react-head';

import Heading from '../shared/Heading';
import { Boards } from '../Board/Boards';

import UserDocument from 'src/documents/user.doc';
import { observer } from 'mobx-react-lite';

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
