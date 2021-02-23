import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, Subscribable} from 'rxjs';
import {PasswordChangeRequest} from '../models/user.model';
import {SocialMediaModel} from '../models/general.configuration/social.media.model';
import {ContactInfoModel} from '../models/general.configuration/contact.info.model';
import {GitVersion} from "../models/git-version.mode";
import {PasswordValidationModel} from '../models/general.configuration/password.validation.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralConfigurationService {
  private apiUrl = environment.apiUrl;
  private configUrl = '/general-configuration';

  constructor(private http: HttpClient) {
  }

  getUsers(): Subscribable<PasswordChangeRequest[]> {
    return this.http.get<PasswordChangeRequest[]>(this.apiUrl + '/user');
  }

  changePassword(passwordChangeRequest: PasswordChangeRequest) {
    return this.http.post(this.apiUrl + '/user/change-password', passwordChangeRequest);
  }

  forgotPassword(email: string) {
    return this.http.post(this.apiUrl + '/user/forgot-password' + '?' + 'email=' + email, {});
  }

  saveFrontPageMessage(frontPageMessage: string) {
    return this.http.post(this.apiUrl + this.configUrl + '/front-page-message' + '?' + 'frontPageMessage=' + frontPageMessage, {});
  }

  getFrontPageMessage() {
    return this.http.get(this.apiUrl + this.configUrl + '/front-page-message', {responseType: 'text'});
  }

  saveAppointmentMessage(appointmentMessage: string) {
    return this.http.post(this.apiUrl + this.configUrl + '/appointment-message' + '?' + 'appointmentMessage=' + appointmentMessage, {});
  }

  getAppointmentMessage() {
    return this.http.get(this.apiUrl + this.configUrl + '/appointment-message', {responseType: 'text'});
  }

  saveSocialMedia(socialMedia: SocialMediaModel) {
    return this.http.post(this.apiUrl + this.configUrl + '/social-media', socialMedia);
  }

  getSocialMedia(): Subscribable<SocialMediaModel> {
    return this.http.get<SocialMediaModel>(this.apiUrl + this.configUrl + '/social-media');
  }

  saveContactInfo(contactInfo: ContactInfoModel) {
    return this.http.post(this.apiUrl + this.configUrl + '/contact-info', contactInfo);
  }

  getContactInfo(): Subscribable<ContactInfoModel> {
    return this.http.get<ContactInfoModel>(this.apiUrl + this.configUrl + '/contact-info');
  }


  getGitInfo(): Observable<GitVersion> {
    return this.http.get<GitVersion>(this.apiUrl + '/git-info');
  }
}
