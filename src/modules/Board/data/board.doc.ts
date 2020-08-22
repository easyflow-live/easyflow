import { Document, Collection } from 'firestorter';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import shortid from 'shortid';

import ListDocument from 'documents/list.doc';
import UserDocument from 'documents/user.doc';
import ActionDocument from 'documents/action.doc';
import BoardInviteDocument, {
  InviteStatus,
} from 'modules/Board/data/board-invite.doc';

export interface Board {
  uid: string;
  index: number;
  title: string;
  code?: string;
  owner: UserDocument['ref'];
  users: UserDocument['ref'][];
  tags?: string[];
  archived?: boolean;
  lists?: string[];
}

const generateDefaultCode = (str: string) => {
  const splited = str.trim().split(' ');

  if (splited.length > 1) {
    return splited.map(word => word[0].toUpperCase()).join('');
  }

  return str.slice(0, 3).toUpperCase();
};

export default class BoardDocument extends Document<Board> {
  private _lists: Collection<ListDocument>;
  private _actions: Collection<ActionDocument>;

  static create(board: Omit<Board, 'uid'>): Promise<BoardDocument> {
    const boards = new Collection<BoardDocument>('/boards');

    return boards.add({
      archived: false,
      tags: [],
      uid: shortid.generate(),
      lists: [],
      ...board,
      users: firebase.firestore.FieldValue.arrayUnion(...board.users),
    });
  }

  get code(): string {
    if (!this.data.code) {
      const code = generateDefaultCode(this.data.title);

      this.update({ code });

      return code;
    }
    return this.data.code;
  }

  get exists(): boolean {
    return this.hasData;
  }

  get lists(): Collection<ListDocument> {
    if (this._lists) return this._lists;

    this._lists = new Collection<ListDocument>(() => `${this.path}/lists`, {
      createDocument: (src, opts) =>
        new ListDocument(src, {
          ...opts,
          debug: __DEV__,
          debugName: 'List document',
        }),
      query: ref => ref.orderBy('index'),
      debug: __DEV__,
      debugName: 'List collection',
    });

    return this._lists;
  }

  get actions(): Collection<ActionDocument> {
    if (this._actions) return this._actions;

    this._actions = new Collection<ActionDocument>(() => 'actions', {
      createDocument: (src, opts) =>
        new ActionDocument(src, {
          ...opts,
          debug: __DEV__,
          debugName: 'Action document',
        }),
      query: ref =>
        ref.where('data.board', '==', this.ref).orderBy('date', 'desc'),
      debug: __DEV__,
      debugName: 'Action collection',
    });

    return this._actions;
  }

  removeTag(tag: string) {
    return this.update({
      tags: firebase.firestore.FieldValue.arrayRemove(tag),
    });
  }

  hasMember(email: string) {
    if (!email) return false;

    const ids = this.data.users?.map(({ id }) => id) || [];
    return ids.includes(email);
  }

  addMember(user: UserDocument | firebase.firestore.DocumentSnapshot) {
    return this.update({
      users: firebase.firestore.FieldValue.arrayUnion(user.ref),
    });
  }

  removeMember(user: UserDocument | firebase.firestore.DocumentSnapshot) {
    return this.update({
      users: firebase.firestore.FieldValue.arrayRemove(user.ref),
    });
  }

  async createInvite(
    user: UserDocument | firebase.firestore.DocumentSnapshot,
    fromUser: UserDocument | firebase.firestore.DocumentSnapshot
  ): Promise<BoardInviteDocument> {
    const invites = new Collection<BoardInviteDocument>('board_invites');

    return invites.add({
      board: this.ref,
      user: user.ref,
      fromUser: fromUser.ref,
      createdAt: firebase.firestore.Timestamp.now(),
      status: InviteStatus.PENDING,
    });
  }

  isOwner(email: string): boolean {
    return this.data.owner.id === email;
  }

  archive() {
    return this.update({ archived: true });
  }
}
