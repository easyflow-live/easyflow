import { List } from 'core/domains/list';
import { Owner } from 'core/domains/owner';
import { Member } from 'core/domains/member';
import { Tag } from 'core/domains/tag';

export interface Board {
  id: string;
  index: number;
  title: string;
  archived: boolean;
  owner: Owner;
  members: Member[];
  tags: Tag[];
  lists?: List[];
}
