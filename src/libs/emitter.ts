import {
  EventEmitter as Emitter,
  EventSubscription as Susbcription,
} from 'fbemitter';

export type EventEmitter = Emitter;
export type EventSubscription = Susbcription;

export interface EmitterTypes {
  ASSIGNEE_UPDATED: { cardId: string };
  TEAM_MEMBER_UPDATED: {};
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
    _emitter.emit(key, payload);
  },
};
