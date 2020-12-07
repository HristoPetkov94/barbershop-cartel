import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subscribable} from 'rxjs';
import {Week} from '../models/week';
import {AppointmentRequest} from '../interfaces/appointment-request';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPreviousWeek(numberOfWeeks, barber) {
    return this.http.post<Week>(this.url + '/schedule/appointment-previous-week/' + barber.id, numberOfWeeks);
  }

  getCurrentWeek(barber): Subscribable<Week> {
    return this.http.get<Week>(this.url + '/schedule/appointment-current-week/' + barber.id);
  }

  getNextWeek(numberOfWeeks, barber) {
    return this.http.post<Week>(this.url + '/schedule/appointment-next-week/' + barber.id, numberOfWeeks);
  }

  getWeekByDate(date) {
    return this.http.get<Week>(this.url + '/schedule/getAppointmentWeekByDate?date=' + date);
  }

  bookNow(req: AppointmentRequest) {
    return this.http.post(this.url + '/schedule/save-appointment', req);
  }
}
