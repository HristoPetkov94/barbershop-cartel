import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subscribable} from 'rxjs';
import {Week} from '../models/week.model';
import {AppointmentRequest} from '../interfaces/appointment-request';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private url = environment.apiUrl + '/appointments';

  constructor(private http: HttpClient) {
  }

  getPreviousWeek(numberOfWeeks, assignmentId) {
    return this.http.get<Week>(this.url + '/appointment-previous-week' + '?' + 'assignmentId=' + assignmentId + '&' + 'numberOfWeeks=' + numberOfWeeks, {});
  }

  getCurrentWeek(assignmentId): Subscribable<Week> {
    return this.http.get<Week>(this.url + '/appointment-current-week' + '?' + 'assignmentId=' + assignmentId);
  }

  getNextWeek(numberOfWeeks, assignmentId) {
    return this.http.get<Week>(this.url + '/appointment-next-week' + '?' + 'assignmentId=' + assignmentId + '&' + 'numberOfWeeks=' + numberOfWeeks, {});
  }

  bookNow(req: AppointmentRequest, language: string) {
    return this.http.post(this.url + '/save-appointment' + '?' + 'language=' + language, req);
  }
}
