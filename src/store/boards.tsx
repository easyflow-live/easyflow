import { createContext, PropsWithChildren, useContext } from 'react';
import { observable, action } from 'mobx';
import { useLocalStore } from 'mobx-react-lite';

import BoardDocument from '../../src/documents/board.doc';
import ListDocument from '../../src/documents/list.doc';
import ColorDocument from '../../src/documents/color.doc';

class BoardsStore {
  @observable currentBoard: BoardDocument = null;
  @observable lists: ListDocument[] = [];
  @observable colors: ColorDocument[] = [];

  @action
  private setCurrentBoard = (board: BoardDocument) => {
    this.currentBoard = board;
  };

  @action
  private setListsFromCurrentBoard = (lists: ListDocument[]) => {
    this.lists = lists;
  };

  @action
  setColors = (colors: ColorDocument[]) => {
    this.colors = colors;
  };

  setBoard = (board: BoardDocument) => {
    this.setCurrentBoard(board);
    this.setListsFromCurrentBoard(board.lists.docs);
  };

  getList = (id: string) => {
    return this.lists.find(list => list.id === id);
  };

  getColor = (id: string) => {
    return this.colors.find(color => color.id === id);
  };
}

const createStore = () => new BoardsStore();

type TStore = ReturnType<typeof createStore>;

const BoardsContext = createContext<TStore | null>(null);

export const BoardsStoreProvider = ({ children }: PropsWithChildren<{}>) => {
  const store = useLocalStore(createStore);

  return (
    <BoardsContext.Provider value={store}>{children}</BoardsContext.Provider>
  );
};

export const useBoardsStore = () => {
  const store = useContext(BoardsContext);

  if (!store) {
    throw new Error(
      'useBoardsStore must be used within a BoardsStoreProvider.'
    );
  }

  return store;
};
