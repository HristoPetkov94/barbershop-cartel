import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NotificationComponent} from '../../../notification/notification.component';
import {GeneralConfigurationService} from '../../../services/general.configuration.service';
import {ValidatePasswordModel} from '../../../models/general.configuration/validate.password.model';
import {User} from '../../../models/user.model';

@Component({
  selector: 'app-password',
  templateUrl: './change.password.component.html',
  styleUrls: ['./change.password.component.css', '../../shared-styles/shared.css']
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private generalConfigurationService: GeneralConfigurationService) {
  }

  @Input() email: string;

  public newPassword = '';
  public confirmPassword = '';
  public oldPassword = '';

  ngOnInit(): void {
  }

  async changePassword() {
    const validate = new ValidatePasswordModel(this.email, this.oldPassword, this.newPassword, this.confirmPassword);

    // sync's the call
    let valid = true;
    await this.generalConfigurationService.validatePassword(validate).toPromise()
      .catch((err) => {
          this.notification.showMessage(err.error.message, 'warn');
          valid = false;
        }
      );

    if (valid) {
      this.confirmPasswordChange();
    }
  }

  public confirmPasswordChange() {
    const user = new User(this.email, this.newPassword);

    if (confirm('Are you sure you want to change password?')) {
      this.generalConfigurationService.changePassword(user).subscribe(data => {

        },
        (err) => {
          console.log(err);
          this.notification.showMessage('Password was not changed', 'warn');
        },
        () => {
          this.notification.showMessage('Password has been changed successfully', 'success');
        }
      );
    }
  }
}
