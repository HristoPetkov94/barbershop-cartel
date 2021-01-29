import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/user.model';
import {NotificationComponent} from '../../../notification/notification.component';
import {GeneralConfigurationService} from '../../../services/general-configuration.service';

@Component({
  selector: 'app-password',
  templateUrl: './change.password.component.html',
  styleUrls: ['./change.password.component.css', '../../shared-styles/shared.css']
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private generalConfigurationService: GeneralConfigurationService) {
  }

  public email: string;
  public newPassword = '';
  public confirmPassword = '';

  ngOnInit(): void {
  }

  public changePassword() {

    if (this.newPassword.length === 0 || this.confirmPassword.length === 0) {
      this.notification.showMessage('Password fields cannot be empty', 'warn');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.notification.showMessage('Passwords does not match', 'warn');
      return;
    }

    const user = new User(this.email, this.newPassword);

    if (confirm('Are you sure you want to change password?')) {
      this.generalConfigurationService.changePassword(user).subscribe(data => {

        },
        () => {
          this.notification.showMessage('Password was not changed', 'warn');
        },
        () => {
          this.notification.showMessage('Password has been changed successfully', 'success');
        }
      );
    }
  }
}
