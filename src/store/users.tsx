import { observable, computed, runInAction, action } from 'mobx';
import { createContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import UserDocument from '..//documents/user.doc';

interface IUser {
  id: string;
  username: string;
  photo: string;
  email: string;
}

class User implements IUser {
  id: string;
  username: string;
  photo: string;
  email: string;

  constructor(private store: UsersStore) {}

  delete() {
    this.store.remove(this);
  }

  @computed get asJson(): IUser {
    return {
      id: this.id,
      username: this.username,
      photo: this.photo,
      email: this.email,
    };
  }

  @action
  updateFromJson(json: IUser) {
    this.id = json.id;
    this.username = json.username;
    this.photo = json.photo;
    this.email = json.email;
  }
}

class UsersStore {
  @observable users: User[] = [];
  @observable isLoading = false;
  @observable currentUser: UserDocument = null;

  @action
  createTodo(data: IUser) {
    const { id, username, photo, email } = data;

    const u = this.getUser(id);
    if (u) return u;

    const user = new User(this);
    user.updateFromJson({ id, username, photo, email });
    this.users.push(user);
    return user;
  }

  @action
  remove(user: User) {
    this.users.splice(this.users.indexOf(user), 1);
  }

  @action
  setCurrentUser(user: UserDocument) {
    this.currentUser = user;
  }

  getUser(id: string) {
    return this.users.find(u => u.id === id);
  }

  @action
  async loadUsers(usersRef: firebase.firestore.DocumentReference[] = []) {
    let loadedUsers = [];
    this.isLoading = true;

    loadedUsers = await Promise.all(
      usersRef.map(async user => {
        const cachedUser = this.users.find(u => u.id === user.id);

        if (cachedUser) return cachedUser;

        const data = (await user.get()).data();

        // @ts-ignore
        return this.createTodo({ ...data, id: user.id });
      })
    );

    runInAction(() => {
      this.isLoading = false;
      this.users = [...new Set([...this.users, ...loadedUsers])];
    });
  }
}

interface UsersContextProp {
  store: UsersStore;
}

const userStore = new UsersStore();

const UsersContext = createContext<UsersContextProp>({
  store: userStore,
});

export default userStore;
export { UsersStore, UsersContext, User };
