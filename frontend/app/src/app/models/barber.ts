import {Service} from '../interfaces/service';

export class Barber {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  picture: string;
  services: Service[];
  deleted: boolean;
}
