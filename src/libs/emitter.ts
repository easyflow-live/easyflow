import { EventEmitter, EventSubscription } from 'fbemitter';

export type EventEmitter = EventEmitter;
export type EventSubscription = EventSubscription;

export interface EmitterTypes {
  ASSIGNEE_UPDATED: { cardId: string };
  TEAM_MEMBER_UPDATED: {};
}

const _emitter = new EventEmitter();

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
