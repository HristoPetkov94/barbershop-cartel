import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Subscribable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getWeek(barber): Subscribable<Week> {
    return this.http.get<Week>(this.url + '/schedule/appointment-current-week/' + barber.id);
  }

  nextWeek(currentWeek, barber) {
    return this.http.post<Week>(this.url + '/schedule/appointment-next-week/' + barber.id, currentWeek);
  }

  prevWeek(currentWeek, barber) {
    return this.http.post<Week>(this.url + '/schedule/appointment-previous-week/' + barber.id, currentWeek);
  }

  getWeekByDate(date) {
    return this.http.get<Week>(this.url + '/schedule/getAppointmentWeekByDate?date=' + date);
  }

  bookNow(req: AppointmentRequest) {
    return this.http.post(this.url + '/schedule/save-appointment', req);
  }
}
