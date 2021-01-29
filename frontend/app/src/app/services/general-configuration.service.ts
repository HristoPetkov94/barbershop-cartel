import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subscribable} from 'rxjs';
import {User} from '../models/user';
import {SocialMediaModel} from '../models/general.configuration/social.media.model';
import {ContactInfoModel} from '../models/general.configuration/contact.info.model';

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

  changePassword(user: User) {
    return this.http.post(this.apiUrl + '/user/change-password', user);
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
}
