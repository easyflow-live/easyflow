import { createContext } from 'react';
import { observable, action } from 'mobx';

import BoardDocument from 'src/documents/board.doc';
import ListDocument from 'src/documents/list.doc';

class BoardsStore {
  @observable currentBoard: BoardDocument = null;
  @observable lists: ListDocument[] = [];

  @action
  setCurrentBoard(board: BoardDocument) {
    this.currentBoard = board;
  }

  @action
  setListsFromCurrentBoard(lists: ListDocument[]) {
    this.lists = lists;
  }

  getList(id: string) {
    return this.lists.find(list => list.id === id);
  }
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
