import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {EmailDetails} from '../models/email.details.model';
import {Subscribable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailNotificationService {
  private apiUrl = environment.apiUrl;
  private emailUrl = '/email-notification';

  constructor(private http: HttpClient) {
  }

  getEmailMessages(language: string): Subscribable<EmailDetails[]> {
    return this.http.get<EmailDetails[]>(this.apiUrl + this.emailUrl + '?' + 'language=' + language);
  }

  saveEmailMessages(bookingEmailDetails: EmailDetails[], language: string) {
    return this.http.post(this.apiUrl + this.emailUrl + '?' + 'language=' + language, bookingEmailDetails);
  }
}
