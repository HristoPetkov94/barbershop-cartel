import {EmailTypeEnum} from '../enums/email.type.enum';

export class EmailDetails {
  id: number;
  from: string;
  subject: string;
  text: string;
  emailType: EmailTypeEnum;

  constructor() {
  }
}
