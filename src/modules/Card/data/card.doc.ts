import { Document } from 'firestorter';
import firebase from 'firebase/app';
import 'firebase/firestore';

import UserDocument from 'documents/user.doc';
import ListDocument from 'documents/list.doc';
import ColorDocument from 'documents/color.doc';

export interface Card {
  id: string;
  title?: string;
  text: string;
  index: number;
  color: string;
  colorRef: ColorDocument['ref'];
  date: string | Date;
  completed: boolean;
  assignee: UserDocument['ref'][];
  tags: string[];
  createdAt: number;
  listBefore: ListDocument['ref'];
  listAfter: ListDocument['ref'];
}

export default class CardDocument extends Document<Card> {
  removeTag(tag: string) {
    return this.update({
      tags: firebase.firestore.FieldValue.arrayRemove(tag),
    });
  }
}
