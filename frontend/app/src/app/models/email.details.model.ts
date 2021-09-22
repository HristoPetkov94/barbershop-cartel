import {EmailTypeEnum} from '../enums/email.type.enum';

export class EmailDetails {
  id: number;
  from: string;
  subject: {};
  text: {};
  emailType: EmailTypeEnum;

  constructor() {
  }
}
