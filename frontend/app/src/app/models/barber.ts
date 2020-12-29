export class Barber {
  // name: string;
  // pic: string;

  id: number;
  email: string;
  password: string;
  firstName?: string;
  lastName: string;
  description?: string;
  picture?: string;

  constructor() {
    this.id = undefined;
    this.email = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
    this.description = '';
    this.picture = '';
  }
}
