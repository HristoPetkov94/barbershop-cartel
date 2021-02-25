export class PasswordChangeRequest {
  oldPassword: string;
  newPassword: string;

  constructor(oldPassword, newPassword) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}
