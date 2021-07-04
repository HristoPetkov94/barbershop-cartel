import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, Subscribable} from 'rxjs';
import {User} from '../models/user.model';
import {GitVersion} from '../models/git-version.mode';
import {PasswordChangeRequest} from '../models/password-change-request.model';
import {EmailChangeRequest} from '../models/email-change-request.model';
import {Configuration} from '../models/general.configuration/configuration.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralConfigurationService {
  private apiUrl = environment.apiUrl;
  private configUrl = '/general-configuration';

  constructor(private http: HttpClient) {
  }

  getUsers(): Subscribable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/user');
  }

  getConfiguration(language: string) {
    const requestUrl = `${this.apiUrl}${this.configUrl}?lang=${language}`;
    return this.http.get<Configuration>(requestUrl);
  }

  changeEmail(emailChangeRequest: EmailChangeRequest) {
    return this.http.post(this.apiUrl + '/user/change-email', emailChangeRequest);
  }

  changePassword(passwordChangeRequest: PasswordChangeRequest) {
    return this.http.post(this.apiUrl + '/user/change-password', passwordChangeRequest);
  }

  getGitInfo(): Observable<GitVersion> {
    return this.http.get<GitVersion>(this.apiUrl + '/git-info');
  }

  saveConfiguration(configuration: Configuration) {
    return this.http.post(this.apiUrl + this.configUrl, configuration);
  }
}
