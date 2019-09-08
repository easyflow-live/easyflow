import { Document } from 'firestorter';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import UserDocument from './user.doc';

export interface Card {
  text: string;
  index: number;
  color: string;
  date: string;
  assignee: UserDocument['ref'];
  tags: string[];
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
