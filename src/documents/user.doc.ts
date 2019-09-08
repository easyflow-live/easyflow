import { Document, Collection } from 'firestorter';
import { DocumentSource, IDocumentOptions } from 'firestorter/lib/Types';

import BoardDocument from './board.doc';

interface User {
  email: string;
  photo: string;
  token: string;
  username: string;
  roles: { admin: boolean };
}

export default class UserDocument extends Document<User> {
  boards: Collection<BoardDocument>;

  constructor(source: DocumentSource, options: IDocumentOptions = {}) {
    super(source, { ...options });

    this.boards = new Collection<BoardDocument>(() => 'boards', {
      createDocument: (src, opts) => new BoardDocument(src, opts),
      query: ref => ref.where('users', 'array-contains', this.ref),
    });
  }
}
