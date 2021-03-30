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

  getPreviousWeek(numberOfWeeks, barber, service) {
    return this.http.post<Week>(this.url + '/appointment-previous-week' + '?' + 'barberId=' + barber.id + '&' + 'serviceId=' + service.id + '&' + 'numberOfWeeks=' + numberOfWeeks, {});
  }

  getCurrentWeek(barber, service): Subscribable<Week> {
    return this.http.get<Week>(this.url + '/appointment-current-week' + '?' + 'barberId=' + barber.id + '&' + 'serviceId=' + service.id);
  }

  getNextWeek(numberOfWeeks, barber, service) {
    return this.http.post<Week>(this.url + '/appointment-next-week' + '?' + 'barberId=' + barber.id + '&' + 'serviceId=' + service.id + '&' + 'numberOfWeeks=' + numberOfWeeks, {});
  }

  bookNow(req: AppointmentRequest) {
    return this.http.post(this.url + '/save-appointment', req);
  }
}
