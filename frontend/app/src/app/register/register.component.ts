import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';
// TODO: Refactor everything here methods, split into components if you have to, refactor css to make it more readable, delete unused stuff.

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private email;
  private firstname;
  private lastname;
  private password;

  private hide = true;

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  register() {
    const user = new User(this.email, this.password, this.firstname, this.lastname);
    console.log(user);
    this.auth.register(user).subscribe(() => {
      console.log('User registered successfully.');

      sessionStorage.setItem('username', this.email);
      this.router.navigate(['login']);
    });
  }
}
