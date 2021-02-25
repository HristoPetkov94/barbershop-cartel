import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NotificationComponent} from '../../../notification/notification.component';
import {GeneralConfigurationService} from '../../../services/general.configuration.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {PasswordChangeRequest} from '../../../models/password-change-request.model';
import {PasswordDoNotMatchValidator, PasswordMatchValidator} from './validators/password.validator';

@Component({
  selector: 'app-password',
  templateUrl: './change.password.component.html',
  styleUrls: ['./change.password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private generalConfigurationService: GeneralConfigurationService, private formBuilder: FormBuilder) {
  }

  @Input() email: string;

  hideOld = true;
  hideNew = true;
  hideConfirm = true;

  passwordForm: FormGroup;

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      }, {
        validators: [
          PasswordMatchValidator('oldPassword', 'newPassword'),
          PasswordDoNotMatchValidator('newPassword', 'confirmPassword'),
        ]
      });

    this.passwordForm.valueChanges.subscribe(() => {
      console.log(this.passwordForm.errors);
      console.log(this.passwordForm.hasError('old'));
    });
  }

  get oldPassword() {
    return this.passwordForm.get('oldPassword');
  }

  get newPassword() {
    return this.passwordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }

  public changePassword() {
    const passwordChangeRequest = new PasswordChangeRequest(this.oldPassword.value, this.newPassword.value);

    if (confirm('Are you sure you want to change password?')) {
      this.generalConfigurationService.changePassword(passwordChangeRequest).subscribe(data => {

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
