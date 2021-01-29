import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {EmailNotification} from '../models/email.notification.model';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  sendEmail(emailNotificationModel: EmailNotification) {
    return this.http.post<EmailNotification>(this.url + '/send-email-message', emailNotificationModel);
  }
}
