import { Collection } from 'firestorter';

import BoardDocument from '../documents/board.doc';
import ActionDocument from '../documents/action.doc';
import { useRef, useEffect } from 'react';

export const useBoardActions = (board: BoardDocument) => {
  const actionsRef = useRef<Collection<ActionDocument>>(null);

  useEffect(() => {
    if (actionsRef.current) return;

    actionsRef.current = new Collection<ActionDocument>(() => 'actions', {
      createDocument: (src, opts) => new ActionDocument(src, opts),
      query: ref =>
        ref.where('data.board', '==', board.ref).orderBy('date', 'desc'),
    });
  }, [board]);

  return actionsRef.current && actionsRef.current;
};
