import { Document, Collection } from 'firestorter';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import ListDocument from './list.doc';
import UserDocument from './user.doc';

interface Board {
  title: string;
  uid: string;
  color: string;
  owner: UserDocument['ref'];
  users: UserDocument['ref'][];
  tags: string[];
}

export default class BoardDocument extends Document<Board> {
  private _lists: Collection<ListDocument>;

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

  removeTag(tag: string) {
    return this.update({
      tags: firebase.firestore.FieldValue.arrayRemove(tag),
    });
  }
}
