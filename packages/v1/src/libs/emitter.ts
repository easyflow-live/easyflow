import {
  EventEmitter as Emitter,
  EventSubscription as Susbcription,
} from 'fbemitter';

export type EventEmitter = Emitter;
export type EventSubscription = Susbcription;

export interface EmitterTypes {
  ASSIGNEE_UPDATED: { cardId: string };
  TEAM_MEMBER_UPDATED: {};
  REMOVE_CARD: {
    title: string;
    text: string;
    listId: string;
  };
  COMPLETE_CARD: {
    title: string;
    listId: string;
    completed: boolean;
    cardId: string;
  };
  ASSIGNE_CARD: {
    title: string;
    listId: string;
    assigneId: string;
    cardId: string;
  };
  ADD_CARD: {
    title: string;
    listId: string;
    cardId: string;
  };
  EDIT_CARD: {
    oldText: string;
    newText: string;
    oldTitle: string;
    newTitle: string;
    listId: string;
    cardId: string;
  };
  MOVE_CARD: {
    listBeforeId: string;
    listAfterId: string;
    cardId: string;
    title: string;
  };
}

const _emitter = new Emitter();

export const emitter = {
  addListener<K extends keyof EmitterTypes>(
    key: K,
    listener: (payload: EmitterTypes[K]) => void
  ) {
    return _emitter.addListener(key, listener);
  },
  emit<K extends keyof EmitterTypes>(key: K, payload: EmitterTypes[K]) {
    if (__DEV__) console.debug('[EMITTER]', key, payload); // tslint:disable-line no-console
    _emitter.emit(key, payload);
  },
};
