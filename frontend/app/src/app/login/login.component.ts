import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {NotificationComponent} from '../notification/notification.component';
import {LanguagePipe} from '../pipes/language-pipe';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public hide = true;
  public matcher = new MyErrorStateMatcher();
  public invalidLogin = false;
  public email: string;
  private language: string;

  @ViewChild(NotificationComponent) notification: NotificationComponent;


  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private router: Router,
              private loginservice: AuthenticationService,
              private languagePipe: LanguagePipe) {
  }

  ngOnInit() {
    this.emailFormControl.setValue(sessionStorage.getItem('username'));
    this.language = this.languagePipe.language;
  }

  login() {
    this.loginservice.authenticate(this.emailFormControl.value, this.passwordFormControl.value).subscribe(
      () => {
        this.router.navigate(['']);
        this.invalidLogin = false;
      },
      err => {
        console.log(err);
        this.invalidLogin = true;
      }
    );
  }

  forgotPassword() {

    if (this.email == null) {
      this.notification.showMessage('Email must be entered.', 'warn');
      return;
    }

    this.loginservice.forgotPassword(this.email, this.language).subscribe(() => {
      },
      (err) => {
        this.notification.showMessage(err.error.message, 'warn');
      }, () => {
        this.notification.showMessage(' Password has been send to the email.', 'success');
      }
    );
  }
}
