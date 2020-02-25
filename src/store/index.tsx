import { useContext } from 'react';
import { useObserver } from 'mobx-react-lite';

import { UsersStore, UsersContext } from './users';
import { useBoardsStore, BoardsStoreProvider } from './boards';

export { useBoardsStore, BoardsStoreProvider };

function useStoreData<Selection, ContextData, Store>(
  context: React.Context<ContextData>,
  storeSelector: (contextData: ContextData) => Store,
  dataSelector: (store: Store) => Selection
) {
  const value = useContext(context);
  if (!value) {
    throw new Error('useStoreData error');
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
