import {Service} from '../interfaces/service';

export class Barber {

  id: number;
  firstName?: string;
  lastName: string;
  description?: string;
  picture?: string;
  services?: Service[];
  deleted?: boolean;

  constructor() {
    this.id = undefined;
    this.firstName = '';
    this.lastName = '';
    this.description = '';
    this.picture = '';
    this.services = [];
    this.deleted = false;
  }
}
