export class PasswordValidationModel {

  public email: string;
  public oldPassword: string;


  constructor(email: string, oldPassword: string) {
    this.email = email;
    this.oldPassword = oldPassword;
  }
}
