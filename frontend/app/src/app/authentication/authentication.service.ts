import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
  }

  authenticate(username, password) {

    return this.httpClient.post<any>(this.url + '/authenticate', {username, password}).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          const token = 'Bearer '.concat(userData.jwttoken);
          sessionStorage.setItem('token', token);
          return userData;
        }
      )
    );
  }

  public register(user) {
    return this.httpClient.post<User>(this.url + '/register', user);
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
  }
}
