import { Collection, isTimestamp } from 'firestorter';

class CardSchema {
  text: string;
  index: number;
  color: string;
  date: isTimestamp;
  assigne: any;
}

class CardsSchema {
  cards: CardSchema[];
}

export class Cards extends Collection {
  constructor(source, options = {}) {
    super(source, {
      schema: CardsSchema,
      ...options,
    });
  }
}
