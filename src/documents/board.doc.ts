import { Document, Collection } from 'firestorter';
import { DocumentSource, IDocumentOptions } from 'firestorter/lib/Types';

import ListDocument from './list.doc';
import UserDocument from './user.doc';

interface Board {
  title: string;
  uid: string;
  color: string;
  owner: UserDocument;
  users: UserDocument[];
}

export default class BoardDocument extends Document<Board> {
  lists: Collection<ListDocument>;

  constructor(source: DocumentSource, options: IDocumentOptions = {}) {
    super(source, { ...options });

    this.lists = new Collection<ListDocument>(() => `${this.path}/lists`, {
      createDocument: (src, opts) => new ListDocument(src, opts),
      query: ref => ref.orderBy('index'),
    });
  }
}
