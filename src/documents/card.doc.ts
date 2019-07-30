import { Document } from 'firestorter';
import UserDocument from './user.doc';

interface Card {
  text: string;
  index: number;
  color: string;
  date: string;
  assigne: UserDocument['ref'];
}

export default class CardDocument extends Document<Card> {
  constructor(source, options = {}) {
    super(source, { ...options });
  }
}
