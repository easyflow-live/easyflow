import { Document, Collection } from 'firestorter';

import CardDocument from './card.doc';

// class ListSchema {
//   title: string;
//   index: number;
//   uid: string;
// }

export default class ListDocument extends Document {
  cards: Collection;

  constructor(source, options = {}) {
    super(source, {
      // schema: ListSchema,
      ...options,
    });

    this.cards = new Collection(() => `${this.path}/cards`, {
      createDocument: (src, opts) => new CardDocument(src, opts),
      query: ref => ref.orderBy('index'),
    });
  }
}
