import { observable, action } from 'mobx';

class SessionStore {
  @observable authUser = null;
  @observable initializing = true;

  @action setAuthUser = authUser => {
    this.authUser = authUser;
  };

  @action setInitializing = initializing => {
    this.initializing = initializing;
  };
}

export default SessionStore;
