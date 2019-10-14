import { Document } from 'firestorter';
import { DocumentSource, IDocumentOptions } from 'firestorter/lib/Types';

import { IAction } from '../core/actions/types';

export default class ActionDocument extends Document<IAction> {
  constructor(source: DocumentSource, options: IDocumentOptions = {}) {
    super(source, { ...options });
  }
}
