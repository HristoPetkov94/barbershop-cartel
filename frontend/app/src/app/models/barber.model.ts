import {Service} from '../interfaces/service';

export class Barber {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  picture: string;
  facebook: string;
  instagram: string;
  services: Service[];
}
