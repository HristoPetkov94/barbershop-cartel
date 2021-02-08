import {Hour} from './hour';

export interface Day {
  date: Date;
  hours: Hour[];
  today: boolean;
  active: string;
}
