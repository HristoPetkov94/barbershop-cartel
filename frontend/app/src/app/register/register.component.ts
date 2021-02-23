import {Component, OnInit} from '@angular/core';
import {PasswordChangeRequest} from '../models/user.model';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';
// TODO: Refactor everything here methods, split into components if you have to, refactor css to make it more readable, delete unused stuff.

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email;
  public password;

  public hide = true;

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    const user = new PasswordChangeRequest(this.email, this.password);
    console.log(user);
    this.auth.register(user).subscribe(() => {
      console.log('UserModel registered successfully.');

      sessionStorage.setItem('username', this.email);
      this.router.navigate(['login']);
    });
  }
}
