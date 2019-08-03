import React from 'react';
import { Title } from 'react-head';

import PageTitle from '../PageTitle/PageTitle';
import { Boards } from '../Board/Boards';

import './Home.scss';

const Home = () => {
  return (
    <>
      <Title>Boards | Easy Flow</Title>

      <div className='m-6'>
        <PageTitle text={'Boards'} />
        <Boards className='mt-5' />
      </div>
    </>
  );
};

export default Home;
