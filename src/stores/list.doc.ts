import { Document, Collection } from 'firestorter';

import { Cards } from './card.doc';

class ListSchema {
  title: string;
  index: number;
  uid: string;
}

class ListsSchema {
  lists: ListSchema[];
}

export default class Lists extends Collection {
  constructor(source, options = {}) {
    super(source, {
      createDocument: (s, o) => new ListSchema(s, o),
      ...options,
    });
    console.log(this);
  }

  get cards() {
    return this.docs.reduce((result, doc) => {
      const cards = new Cards(doc.path + '/cards');
      result[doc.id] = cards.docs;
      return result;
    }, {});
  }
}

// export default class List extends Document {
//   constructor(source, options = {}) {
//     super(source, {
//       schema: ListSchema,
//       ...options,
//     });
//   }

//   get cards() {
//     return new Card(this.path + '/cards');
//   }
// }
