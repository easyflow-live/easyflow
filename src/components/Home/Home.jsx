import React from 'react';
import { Title } from 'react-head';
import Header from '../Header/Header';
import BoardAdder from './BoardAdder';
import './Home.scss';
import { useBoards } from '../../hooks/useBoards';

const Home = () => {
  const { boards } = useBoards();
  const listsById = {};

  return (
    <>
      <Title>Home | React Kanban</Title>
      <Header />
      <div className="home">
        <div className="main-content">
          <h1>Boards</h1>
          <div className="boards">
            {boards.map(board => (
              <a
                key={board.uid}
                href={`/board?uid=${board.uid}`}
                className="board-link"
              >
                <div className="board-link-title">{board.title}</div>
                <div className="mini-board">
                  {board.lists &&
                    board.lists.map(listId => (
                      <div
                        key={listId.uid}
                        className="mini-list"
                        style={{
                          height: `${Math.min(
                            (listId.cards.length + 1) * 18,
                            100
                          )}%`,
                        }}
                      />
                    ))}
                </div>
              </a>
            ))}
            <BoardAdder />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
