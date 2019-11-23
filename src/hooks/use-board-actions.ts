import { Collection } from 'firestorter';

import BoardDocument from '../documents/board.doc';
import ActionDocument from '../documents/action.doc';
import { useEffect, useState } from 'react';

export const useBoardActions = (board: BoardDocument) => {
  const [action, setAction] = useState<Collection<ActionDocument>>(null);

  useEffect(() => {
    if (!board || action) return;

    const newAction = new Collection<ActionDocument>(() => 'actions', {
      createDocument: (src, opts) =>
        new ActionDocument(src, {
          ...opts,
          debug: __DEV__,
          debugName: 'Action document',
        }),
      query: ref =>
        ref.where('data.board', '==', board.ref).orderBy('date', 'desc'),
      debug: __DEV__,
      debugName: 'Action collection',
    });

    setAction(newAction);
  }, [board]);

  return action;
};
