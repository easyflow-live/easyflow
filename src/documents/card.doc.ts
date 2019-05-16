import { Document } from 'firestorter';

// class CardSchema {
//   text: string;
//   index: number;
//   color: string;
//   date: string;
//   assigne: any;
// }

export default class CardDocument extends Document {
  constructor(source, options = {}) {
    super(source, {
      // schema: CardSchema,
      ...options,
    });

    this.assigneeDoc = new Document(() => this.data.assigne);
  }
}
