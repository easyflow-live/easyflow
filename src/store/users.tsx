import { observable, runInAction, action, makeObservable } from 'mobx';
import { createContext, PropsWithChildren, useContext } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import firebase from 'firebase/app';

import UserDocument from '../documents/user.doc';

interface IUser {
  id: string;
  username: string;
  photo: string;
  email: string;
}

export class User implements IUser {
  id: string;
  username: string;
  photo: string;
  email: string;

  constructor(private store: UsersStore) {
    makeObservable(this, {
      updateFromJson: action,
    });
  }

  delete() {
    this.store.remove(this);
  }

  updateFromJson = (json: IUser) => {
    this.id = json.id;
    this.username = json.username;
    this.photo = json.photo;
    this.email = json.email;
  };
}

class UsersStore {
  users: User[] = [];
  isLoading = false;
  currentUser: UserDocument = null;

  constructor() {
    makeObservable(this, {
      users: observable,
      isLoading: observable,
      currentUser: observable,
      createUser: action,
      remove: action,
      loadUsers: action,
    });
  }

  createUser = (data: IUser) => {
    const { id, username, photo, email } = data;

    const u = this.getUser(id);
    if (u) return u;

    const user = new User(this);
    user.updateFromJson({ id, username, photo, email });
    this.users.push(user);
    return user;
  };

  remove = (user: User) => {
    this.users.splice(this.users.indexOf(user), 1);
  };

  getUser = (id: string) => {
    return this.users.find(u => u.id === id);
  };

  loadUsers = async (usersRef: firebase.firestore.DocumentReference[] = []) => {
    let loadedUsers = [];
    this.isLoading = true;

    loadedUsers = await Promise.all(
      usersRef.map(async user => {
        const cachedUser = this.users.find(u => u.id === user.id);

        if (cachedUser) return cachedUser;

        const data = (await user.get()).data();

        // @ts-ignore
        return this.createUser({ ...data, id: user.id });
      })
    );

    runInAction(() => {
      this.isLoading = false;
      this.users = [...new Set([...this.users, ...loadedUsers])];
    });
  };
}

const createStore = () => new UsersStore();

type TStore = ReturnType<typeof createStore>;

const UsersContext = createContext<TStore | null>(null);

export const UsersStoreProvider = ({ children }: PropsWithChildren<{}>) => {
  const store = useLocalStore(createStore);

  return (
    <UsersContext.Provider value={store}>{children}</UsersContext.Provider>
  );
};

export const useUsersStore = () => {
  const store = useContext(UsersContext);

  if (!store) {
    throw new Error('useUsersStore must be used within a UsersStoreProvider.');
  }

  return store;
};
