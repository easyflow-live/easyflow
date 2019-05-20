import React from 'react';
import { Title } from 'react-head';

import PageTitle from '../PageTitle/PageTitle';
import { Boards } from '../Board/Boards';

import './Home.scss';

const Home = () => {
  return (
    <>
      <Title>Home | Easy Flow</Title>

      <div className='m-6'>
        <PageTitle text={'Boards'} />
        <Boards />
      </div>
    </>
  );
};

export default Home;
