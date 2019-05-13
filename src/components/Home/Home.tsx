import React from 'react';
import { Title } from 'react-head';

import Header from '../Header/Header';
import { Boards } from '../Board/Boards';

import './Home.scss';

const Home = () => {
  return (
    <>
      <Title>Home | React Kanban</Title>
      <Header />
      <div className="home">
        <div className="main-content">
          <h1>Boards</h1>
          <Boards />
        </div>
      </div>
    </>
  );
};

export default Home;
