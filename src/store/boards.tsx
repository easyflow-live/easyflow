import { createContext } from 'react';
import { observable, action } from 'mobx';

import BoardDocument from 'src/documents/board.doc';
import ListDocument from 'src/documents/list.doc';
import ColorDocument from 'src/documents/color.doc';

class BoardsStore {
  @observable currentBoard: BoardDocument = null;
  @observable lists: ListDocument[] = [];
  @observable colors: ColorDocument[] = [];

  @action
  setCurrentBoard = (board: BoardDocument) => {
    this.currentBoard = board;
  };

  @action
  setListsFromCurrentBoard = (lists: ListDocument[]) => {
    this.lists = lists;
  };

  @action
  setColors = (colors: ColorDocument[]) => {
    this.colors = colors;
  };

  getList = (id: string) => {
    return this.lists.find(list => list.id === id);
  };

  getColor = (id: string) => {
    return this.colors.find(color => color.id === id);
  };
}

interface BoardsContextProp {
  store: BoardsStore;
}

const boardsStore = new BoardsStore();

const BoardsContext = createContext<BoardsContextProp>({
  store: boardsStore,
});

export default boardsStore;
export { BoardsStore, BoardsContext };
