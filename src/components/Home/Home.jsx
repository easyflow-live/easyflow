import React from 'react';
import { Title } from 'react-head';
import Header from '../Header/Header';
import BoardAdder from './BoardAdder';
import './Home.scss';
import { useSession } from '../../hooks/useSession';
import WithRouter from '../WithRouter';


const BoardLink = WithRouter(({ board, ...props }) => {
  return (
    <a className="board-link" {...props}>
      <span className="board-link-title">{board.title}</span>
    </a>
  )
});

const Home = () => {
  const { boards, setCurrentBoard } = useSession();

  const setAsCurrentBoard = React.useCallback((boardId) => {
    setCurrentBoard(boardId);
  });

  return (
    <>
      <Title>Home | React Kanban</Title>
      <Header />
      <div className="home">
        <div className="main-content">
          <h1>Boards</h1>
          <div className="boards">
            {boards && boards.length && boards.map(board => (
              <BoardLink 
                board={board} 
                key={board.uid} 
                onClick={() => setAsCurrentBoard(board.uid)}
                routeTo={`/board?uid=${board.uid}`}
              />
            ))}
            <BoardAdder />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
