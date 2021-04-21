import { User } from '../store/users';

export const sortUsersAlpha = (a: User, b: User) => {
  if (a.username < b.username) {
    return -1;
  }
  if (a.username > b.username) {
    return 1;
  }
  return 0;
};
