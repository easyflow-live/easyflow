import { Document, Collection } from 'firestorter';

import BoardDocument from './board.doc';

interface User {
  email: string;
  photo: string;
  token: string;
  username: string;
  roles: { admin: boolean };
}
export default class UserDocument extends Document<User> {
  private _boards: Collection<BoardDocument>;

  get boards(): Collection<BoardDocument> {
    if (this._boards) return this._boards;

    this._boards = new Collection<BoardDocument>(() => 'boards', {
      createDocument: (src, opts) =>
        new BoardDocument(src, {
          ...opts,
          debug: __DEV__,
          debugName: 'Board document',
        }),
      query: ref => ref.where('users', 'array-contains', this.ref),
      debug: __DEV__,
      debugName: 'Board collection',
    });

    return this._boards;
  }
}
