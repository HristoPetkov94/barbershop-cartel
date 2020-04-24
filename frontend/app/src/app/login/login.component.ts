import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatIconRegistry} from '@angular/material';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
// TODO: Refactor everything here methods, split into components if you have to, refactor css to make it more readable, delete unused stuff.

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  private hide = true;
  private matcher = new MyErrorStateMatcher();
  private invalidLogin = false;

  private emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  private passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private router: Router,
              private loginservice: AuthenticationService) {
  }

  ngOnInit() {
    this.emailFormControl.setValue(sessionStorage.getItem('username'));
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
}
