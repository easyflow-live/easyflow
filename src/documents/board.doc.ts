import { Document, Collection } from 'firestorter';
import { DocumentSource, IDocumentOptions } from 'firestorter/lib/Types';
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
  lists: Collection<ListDocument>;

  constructor(source: DocumentSource, options: IDocumentOptions = {}) {
    super(source, { ...options });

    this.lists = new Collection<ListDocument>(() => `${this.path}/lists`, {
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
  }

  removeTag(tag: string) {
    return this.update({
      tags: firebase.firestore.FieldValue.arrayRemove(tag),
    });
  }
}
