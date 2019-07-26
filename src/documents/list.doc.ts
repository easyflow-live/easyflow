import { Document, Collection } from 'firestorter';

import CardDocument from './card.doc';
import UserDocument from './user.doc';

interface List {
  title: string;
  index: number;
  uid: string;
  color: string;
  owner: UserDocument;
  public: boolean;
  tags: string[];
  users: UserDocument[];
  cardsLimit: number;
}

export default class ListDocument extends Document<List> {
  cards: Collection<CardDocument>;

  constructor(source, options = {}) {
    super(source, { ...options });

    this.cards = new Collection<CardDocument>(() => `${this.path}/cards`, {
      createDocument: (src, opts) => new CardDocument(src, opts),
      query: ref => ref.orderBy('index'),
    });
  }
}
