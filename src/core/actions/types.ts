import UserDocument from 'src/documents/user.doc';

export enum Actions {
  UPDATE_CARD = 'updateCard',
}

export interface IAction {
  date: number;
  memberCreator: UserDocument['ref'];
  type: Actions;
  data: any;
}
