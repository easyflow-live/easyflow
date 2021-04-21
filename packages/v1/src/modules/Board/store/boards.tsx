import { createContext, PropsWithChildren, useContext } from 'react';
import { observable, action, makeObservable } from 'mobx';
import { useLocalStore } from 'mobx-react-lite';
import { Collection, Mode } from 'firestorter';

import BoardDocument from 'modules/Board/data/board.doc';
import ListDocument from 'documents/list.doc';
import ColorDocument from 'documents/color.doc';

class BoardsStore {
  currentBoard: BoardDocument = null;
  lists: ListDocument[] = [];
  colors: ColorDocument[] = [];

  private setCurrentBoard = (board: BoardDocument) => {
    this.currentBoard = board;
    this.fetchColors();
  };

  private setListsFromCurrentBoard = (lists: ListDocument[]) => {
    this.lists = lists;
  };

  private setColors = (colors: ColorDocument[]) => {
    this.colors = colors;
  };

  private fetchColors = () => {
    if (this.colors.length) return;

    const colors = new Collection<ColorDocument>(() => 'colors', {
      mode: Mode.Off,
      createDocument: (src, opts) =>
        new ColorDocument(src, {
          ...opts,
          debug: __DEV__,
          debugName: 'Color document',
        }),
      debug: __DEV__,
      debugName: 'Colors collection',
    });

    colors.fetch().then(data => this.setColors(data.docs));
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

  constructor() {
    makeObservable<BoardsStore, "setCurrentBoard" | "setListsFromCurrentBoard" | "setColors">(this, {
      currentBoard: observable,
      lists: observable,
      colors: observable,
      setCurrentBoard: action,
      setListsFromCurrentBoard: action,
      setColors: action
    });
  }
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
