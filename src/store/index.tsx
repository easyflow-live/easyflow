import { useContext } from 'react';
import { useObserver, useStaticRendering } from 'mobx-react-lite';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

import { UsersStore, UsersContext } from './users';
import { BoardsStore, BoardsContext } from './boards';

function useStoreData<Selection, ContextData, Store>(
  context: React.Context<ContextData>,
  storeSelector: (contextData: ContextData) => Store,
  dataSelector: (store: Store) => Selection
) {
  const value = useContext(context);
  if (!value) {
    throw new Error();
  }
  const store = storeSelector(value);
  return useObserver(() => dataSelector(store));
}

export function useUsersData<Selection>(
  dataSelector: (store: UsersStore) => Selection
) {
  return useStoreData(
    UsersContext,
    contextData => contextData.store,
    dataSelector
  );
}

export function useBoardsData<Selection>(
  dataSelector: (store: BoardsStore) => Selection
) {
  return useStoreData(
    BoardsContext,
    contextData => contextData.store,
    dataSelector
  );
}
