import { Document, Collection } from 'firestorter';

import ListDocument from './list.doc';

// class BoardSchema {
//   title: string;
//   uid: string;
//   color: string;
//   owner: string;
//   users: [string];
// }

export default class BoardDocument extends Document {
  lists: Collection;

  constructor(source, options = {}) {
    super(source, {
      // schema: BoardSchema,
      ...options,
    });

    this.lists = new Collection(() => `${this.path}/lists`, {
      createDocument: (src, opts) => new ListDocument(src, opts),
      query: ref => ref.orderBy('index'),
    });
  }
}
