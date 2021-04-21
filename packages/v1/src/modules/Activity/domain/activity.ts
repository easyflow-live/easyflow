import { CardActivity } from 'modules/Activity/domain/card-activity';

export interface Activity {
  date: number;
  memberCreator: any;
  type: CardActivity;
  data: any;
}
