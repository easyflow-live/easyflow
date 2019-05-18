import { Document, Collection } from 'firestorter';

import BoardDocument from './board.doc';

// class UserSchema {
//   email: string;
//   photo: string;
//   token: string;
//   username: string;
//   roles: object;
// }

export default class UserDocument extends Document {
  boards: Collection<BoardDocument>;

  constructor(source, options = {}) {
    super(source, {
      // schema: UserSchema,
      ...options,
    });

    this.boards = new Collection(() => 'boards', {
      createDocument: (src, opts) => new BoardDocument(src, opts),
      query: ref => ref.where('users', 'array-contains', this.ref),
    });
  }
}
