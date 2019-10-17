import { Document } from 'firestorter';

export interface Color {
  name: string;
  code: string;
}

export default class ColorDocument extends Document<Color> {
  constructor(source, options = {}) {
    super(source, { ...options });
  }
}
