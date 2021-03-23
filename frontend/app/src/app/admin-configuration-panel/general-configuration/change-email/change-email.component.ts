import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NotificationComponent} from '../../../notification/notification.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GeneralConfigurationService} from '../../../services/general.configuration.service';
import {EmailChangeRequest} from '../../../models/email-change-request.model';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  @Input() email: string;

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  emailForm: FormGroup;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private generalConfigurationService: GeneralConfigurationService,
              private formBuilder: FormBuilder) {
  }

  get emailControl() {
    return this.emailForm.get('emailControl');
  }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group(
      {
        emailControl: [this.email, [Validators.required, Validators.email]],
      });
  }

  changeEmail() {

    if (!confirm('Are you sure you want to change email?\nChanging the email will log you out\nPlease also re-login from your other devices!')) {
      return;
    }

    const emailChangeRequest = new EmailChangeRequest(this.emailControl.value);

    this.generalConfigurationService.changeEmail(emailChangeRequest).subscribe(data => {

      },
      () => {
        this.notification.showMessage('Email was not changed', 'warn');
      },
      () => {
        this.notification.showMessage('Email has been changed successfully', 'success');

        this.authenticationService.logOut();

        this.router.navigate(['/login']);
      }
    );
  }

}
