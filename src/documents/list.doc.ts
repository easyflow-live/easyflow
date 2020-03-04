import { Document, Collection } from 'firestorter';

import CardDocument from './card.doc';
import UserDocument from './user.doc';

export interface List {
  title: string;
  index: number;
  uid: string;
  color: string;
  owner: UserDocument['ref'];
  public: boolean;
  tags: string[];
  users: UserDocument['ref'][];
  cardsLimit: number;
}

export default class ListDocument extends Document<List> {
  private _cards: Collection<CardDocument>;

  get cards(): Collection<CardDocument> {
    if (this._cards) return this._cards;

    this._cards = new Collection<CardDocument>(() => `${this.path}/cards`, {
      createDocument: (src, opts) =>
        new CardDocument(src, {
          ...opts,
          debug: __DEV__,
          debugName: 'Card document',
        }),
      query: ref => ref.orderBy('index'),
      debug: __DEV__,
      debugName: 'Card collection',
    });

    return this._cards;
  }
}
