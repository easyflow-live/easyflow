import { Document, Collection } from 'firestorter';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import ListDocument from './list.doc';
import UserDocument from './user.doc';
import ActionDocument from './action.doc';

export interface Board {
  title: string;
  uid: string;
  color: string;
  owner: UserDocument['ref'];
  users: UserDocument['ref'][];
  tags: string[];
  archived?: boolean;
}

export default class BoardDocument extends Document<Board> {
  private _lists: Collection<ListDocument>;
  private _actions: Collection<ActionDocument>;

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

  hasMember(user: UserDocument | firebase.firestore.DocumentSnapshot) {
    if (!user) return false;

    const ids = this.data.users?.map(({ id }) => id) || [];
    return ids.includes(user.id);
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
}
