import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {User} from '../models/user.model';
import {RoutingExtService} from '../services/routing-ext.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = environment.apiUrl;

  private readonly USERNAME_KEY = 'username';
  private readonly TOKEN_KEY = 'token';

  constructor(private httpClient: HttpClient, private routingExtService: RoutingExtService) {
  }

  authenticate(username, password) {

    return this.httpClient.post<any>(this.url + '/authenticate', {username, password}).pipe(
      map(
        userData => {
          sessionStorage.setItem(this.USERNAME_KEY, username);

          const token = 'Bearer '.concat(userData.jwttoken);
          sessionStorage.setItem(this.TOKEN_KEY, token);

          return userData;
        }
      )
    );
  }

  public register(user) {
    return this.httpClient.post<User>(this.url + '/register', user);
  }

  isUserLoggedIn() {

    const user = sessionStorage.getItem(this.USERNAME_KEY);

    if (user !== null && this.isJWTExpired()){
      this.logOut();

      this.routingExtService.reloadComponent();
    }

    return !(user === null);
  }

  isJWTExpired(){

    const jwt = JSON.parse(atob(sessionStorage.getItem(this.TOKEN_KEY).split('.')[1]));

    const current = Date.now() / 1000;
    return +jwt.exp < current;
  }

  logOut() {
    sessionStorage.removeItem(this.USERNAME_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}
