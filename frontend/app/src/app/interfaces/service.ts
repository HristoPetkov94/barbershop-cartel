export class Service {
  id: number;
  serviceType: string;
  price: number;
  duration: number;
  description: string;
  picture: any;
  deleted = false;

  constructor() {
    this.serviceType = '';
    this.price = 0;
    this.duration = 0;
    this.description = '';
    this.picture = '';
    this.deleted = false;
  }
}
