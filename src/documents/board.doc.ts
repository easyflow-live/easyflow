import { Document, Collection } from 'firestorter';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import shortid from 'shortid';

import ListDocument from './list.doc';
import UserDocument from './user.doc';
import ActionDocument from './action.doc';
import BoardInviteDocument, { InviteStatus } from './board-invite.doc';

export interface Board {
  uid: string;
  index: number;
  title: string;
  owner: UserDocument['ref'];
  users: UserDocument['ref'][];
  tags?: string[];
  archived?: boolean;
  lists?: string[];
}

export default class BoardDocument extends Document<Board> {
  private _lists: Collection<ListDocument>;
  private _actions: Collection<ActionDocument>;

  static craate(board: Omit<Board, 'uid'>): Promise<BoardDocument> {
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
}
