import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NotificationComponent} from '../../../notification/notification.component';
import {GeneralConfigurationService} from '../../../services/general.configuration.service';
import {PasswordChangeRequest} from '../../../models/user.model';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty && control?.touched);

    return invalidCtrl || invalidParent;
  }
}

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

  matcher = new MyErrorStateMatcher();

  hideOld = true;
  hideNew = true;
  hideConfirm = true;

  passwordForm: FormGroup;
  confirmFrom: FormGroup;

  ngOnInit(): void {

    this.confirmFrom = this.formBuilder.group(
      {
        newPassword: ['', Validators.required],
        confirmPassword: '',
      }, {validators: this.checkPasswords}
    );

    this.passwordForm = this.formBuilder.group(
      {
        oldPassword: ['', Validators.required],
        confirmFrom: this.confirmFrom,
      });

  }

  checkPasswords(group: FormGroup) {
    const confirmField = group.get('confirmPassword');

    const newPassword = group.get('newPassword').value;
    const confirmPassword = confirmField.value;

    if (newPassword === confirmPassword) {
      return null;
    }

    return {same: true};
  }

  get oldPassword() {
    return this.passwordForm.get('oldPassword');
  }

  get newPassword() {
    return this.confirmFrom.get('newPassword');
  }

  get confirmPassword() {
    return this.confirmFrom.get('confirmPassword');
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
