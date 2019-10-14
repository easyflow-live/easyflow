import { Document } from 'firestorter';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import UserDocument from './user.doc';
import ListDocument from './list.doc';

export interface Card {
  title?: string;
  text: string;
  index: number;
  color: string;
  date: string;
  assignee: UserDocument['ref'][];
  tags: string[];
  createdAt: number;
  listBefore: ListDocument['ref'];
  listAfter: ListDocument['ref'];
}

export default class CardDocument extends Document<Card> {
  constructor(source, options = {}) {
    super(source, { ...options });
  }

  removeTag(tag: string) {
    return this.update({
      tags: firebase.firestore.FieldValue.arrayRemove(tag),
    });
  }
}
