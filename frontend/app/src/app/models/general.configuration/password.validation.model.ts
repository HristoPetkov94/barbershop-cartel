export class PasswordValidationModel {

  public email: string;
  public oldPassword: string;
  public newPassword: string;
  public confirmPassword: string;


  constructor(email: string, oldPassword: string, newPassword: string, confirmPassword: string) {
    this.email = email;
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }
}
