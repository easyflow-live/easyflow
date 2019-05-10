import { decorate, observable, action } from "mobx";

import firebase from './firebase.service';

export class Board {
  constructor({uid, owner, title, users, color, listStore}) {
    this.listStore = listStore;
    this.uid = uid;
    this.owner = owner;
    this.title = title;
    this.color = color || '';
    this.users = users ? users : firebase.app.firestore.FieldValue.arrayUnion(owner);
  }
}

export class List {
  constructor({uid, title, cards, cardStore}) {
    this.cardStore = cardStore;
    this.title = title;
    this.uid = uid;
    this.cards = cards ? cards : firebase.app.firestore.FieldValue.arrayUnion(owner);
  }
}

export class ListStore {
  constructor() {
    this.lists = [];
  }

  startListener = () => {
    return firebase.listenToBoards(boards =>
      this.setBoards(boards.map(b => {
          const board = new Board({
            ...b,
            listStore: new ListStore()
          });
          return board;
        }),
        e => console.log(e)
      ));
  }
}

export class BoardStore {
  constructor(listStore) {
    this.listStore = listStore;
    this.boards = [];
    this.collection = firebase.getBoards();
    this.currentBoard = null;
  }

  startListener = () => {
    return firebase.listenToBoards(boards => 
      this.setBoards(boards.map( b => {
        const board = new Board({
          ...b,
          listStore: new ListStore(),
        });
        return board;
      }),
      e => console.log(e)
      ));
  }

  setBoards = (boards) => {
    this.boards = boards;
  }

  setCurrentBoard = (board) => {
    this.currentBoard = board;
  }

  add = ({owner, title}) => {
    const board = new Board({
      owner,
      title,
      listStore: new ListStore(boardId)
    });
    this.boards.push(board);
    this.addOnFirebase(board)
  }

  addOnFirebase = (board) => {
    return this.collection.add({ ...board });
  }

  remove = ({boardUid}) => {
    this.boards = this.boards.filter(b => b.uid !== boardUid);
    this.removeOnFirebase({ boardUid });
  }

  removeOnFirebase = ({boardUid}) => {
    return firebase
      .getBoard(boardUid)
      .delete();
  }

  update = ({boardUid, data}) => {
    this.baords = this.boards.map(b => {
      if(b.uid === boardUid) {
        return {...b, ...data}
      }
      return b;
    })
    this.updateOnFirebase({boardUid, data})
  }

  updateOnFirebase = ({ boardUid, data }) => {
    return firebase
      .getBoard(boardUid)
      .update({...data});
  }
}

decorate(Board, {
  title: observable,
  color: observable,
  users: observable,
  lists: observable
});

decorate(BoardStore, {
  boards: observable,
  color: observable,
  users: observable,
  currentBoard: observable,
  setBoards: action,
  add: action,
  remove: action,
  update: action,
  setCurrentBoard: action,
});

export default new BoardStore();