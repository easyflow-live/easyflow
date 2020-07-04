import { Document } from 'firestorter';
import * as firebase from 'firebase/app';

import BoardDocument from './board.doc';
import UserDocument from './user.doc';

export enum InviteStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

interface BoardInvite {
  board: BoardDocument['ref'];
  user: UserDocument['ref'];
  fromUser: UserDocument['ref'];
  status: InviteStatus;
  createdAt: firebase.firestore.Timestamp;
}
export default class BoardInviteDocument extends Document<BoardInvite> {}
